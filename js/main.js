import { token } from './access_token.js';

const generateHTML = data => {
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
        generateHTML(data[0]);
        console.log(data[0]);
    });

