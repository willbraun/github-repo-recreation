import { token } from './access_token.js';

fetch(`https://api.github.com/users/willbraun`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));