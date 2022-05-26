import { token } from './access_token.js';
// import format from './../node_modules/date-fns/format/index.js';

const generateRepoHTML = data => {
    const source = document.querySelector('#repo-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(data);
    document.querySelector('.repos').innerHTML = html;
}

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
    console.log(repoArray);
})

fetchAndDo(`https://api.github.com/users/willbraun`, personalData => {
    document.querySelector('.profile-pic').src = personalData.avatar_url;
    document.querySelector('.profile-pic').alt = personalData.name;
    console.log(personalData);
})

fetchAndDo(`https://api.github.com/users/willbraun/orgs`, orgArray => {
    document.querySelector('.org-pic').src = orgArray[0].avatar_url;
    document.querySelector('.org-pic').alt = orgArray[0].login;
})
       

console.log(format(new Date(2014, 1, 11), 'MM/dd/yyyy'));
    //=> '02/11/2014' f 
