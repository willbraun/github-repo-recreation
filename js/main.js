import { token } from './access_token.js';
// import format from './../node_modules/date-fns/format/index.js';

const generateRepoHTML = data => {
    const source = document.querySelector('#repo-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(data);
    document.querySelector('.repos').innerHTML = html;
}



fetch(`https://api.github.com/users/willbraun/repos`, {
    headers: {
        Authorization: `token ${token}`,
    },
    })
    .then((response) => response.json())
    .then((data) => {
        generateRepoHTML({repos: data});
        document.querySelector('.count').innerHTML = data.length.toString();

        console.log(data);
    });

fetch(`https://api.github.com/users/willbraun`, {
    headers: {
        Authorization: `token ${token}`,
    },
    })
    .then((response) => response.json())
    .then((data) => {
        document.querySelector('.profile-pic').src = data.avatar_url;
        document.querySelector('.profile-pic').alt = data.name;
        console.log(data);
    });

fetch(`https://api.github.com/users/willbraun/orgs`, {
    headers: {
        Authorization: `token ${token}`,
    },
    })
    .then((response) => response.json())
    .then((data) => {
        document.querySelector('.org-pic').src = data[0].avatar_url;
        document.querySelector('.org-pic').alt = data[0].login;

        console.log(data);
    });
       

console.log(format(new Date(2014, 1, 11), 'MM/dd/yyyy'));
    //=> '02/11/2014' f 
