import { token } from './access_token.js';
// import addDays from './../node_modules/date-fns/addDays/index.js';

const generateRepoHTML = data => {
    const source = document.querySelector('#repo-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(data);
    document.querySelector('.repos').innerHTML = html;
}

Handlebars.registerHelper('findDaysElapsed', function (startDate) {
    const now = new Date();
    const date = new Date(startDate);

    const seconds = dateFns.differenceInSeconds(now, date);
    if (seconds < 60) {return `Updated less than 1 minute ago`};

    const minutes = dateFns.differenceInMinutes(now, date);
    if (minutes < 60) {return `Updated ${minutes} minutes ago`};

    const hours = dateFns.differenceInHours(now, date);
    if (hours < 24) {return `Updated ${hours} hours ago`};
    
    const days = dateFns.differenceInDays(now, date);
    if (days === 1) {return `Updated 1 day ago`}
    else if (days < 32) {return `Updated ${days} days ago`}
    else {return `Updated on ${dateFns.format(date, 'MMM d, YYYY')}`};
})

const fetchAndDo = (url, callback) => {
    fetch(url, {
    headers: {
        Authorization: `token ${token}`,
    },
    })
    .then((response) => response.json())
    .then(data => callback(data));
}

fetchAndDo(`https://api.github.com/users/willbraun/repos`, repoArray => {
    generateRepoHTML({repos: repoArray});
    document.querySelector('.count').innerHTML = repoArray.length.toString();

})

fetchAndDo(`https://api.github.com/users/willbraun`, personalData => {
    document.querySelector('.profile-pic').src = personalData.avatar_url;
    document.querySelector('.profile-pic').alt = personalData.name;
})

fetchAndDo(`https://api.github.com/users/willbraun/orgs`, orgArray => {
    document.querySelector('.org-pic').src = orgArray[0].avatar_url;
    document.querySelector('.org-pic').alt = orgArray[0].login;
})