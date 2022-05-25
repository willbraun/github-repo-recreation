import { token } from './access_token.js';
// import format from './../node_modules/date-fns/format/index.js';

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

console.log(format(new Date(2014, 1, 11), 'MM/dd/yyyy'));
    //=> '02/11/2014' f
