import { colors } from './colors.js';

Handlebars.registerHelper('setColor', function(lang) {
    return colors[lang];
});

Handlebars.registerHelper('findTimeElapsed', function(startDate) {
    const now = new Date();
    const date = new Date(startDate);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {return `Updated less than 1 minute ago`};

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {return `Updated ${minutes} minutes ago`};

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {return `Updated ${hours} hours ago`};
    
    const days = Math.floor(hours / 24);
    if (days === 1) {return `Updated 1 day ago`}
    else if (days < 32) {return `Updated ${days} days ago`}
    else {return `Updated on ${date.toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric' })}`};
});

const generateRepoHTML = data => {
    const source = document.querySelector('#repo-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(data);
    document.querySelector('.repos').innerHTML = html;
}

const fetchAndDo = (url, callback) => {
    fetch(url)
    .then((response) => response.json())
    .then(data => callback(data));
}

fetchAndDo(`https://api.github.com/users/willbraun/repos`, repoArray => {
    generateRepoHTML({repos: repoArray});
    document.querySelector('.count').innerHTML = repoArray.length.toString();
    document.querySelector('.lang-color').style.backgroundColor = colors[repoArray.language];
})

fetchAndDo(`https://api.github.com/users/willbraun`, personalData => {
    document.querySelector('.profile-pic').src = personalData.avatar_url;
    document.querySelector('.profile-pic').alt = personalData.name;
})

fetchAndDo(`https://api.github.com/users/willbraun/orgs`, orgArray => {
    document.querySelector('.org-pic').src = orgArray[0].avatar_url;
    document.querySelector('.org-pic').alt = orgArray[0].login;
})