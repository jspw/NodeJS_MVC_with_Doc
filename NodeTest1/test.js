// const { write } = require('fs');
const http = require('http');

// const server = http.createServer((req, res) => {
//     const url = req.url;
//     // res.writeHead('Content-Type', 'text/html');
//     if (url === '/') {
//         res.write('<html>')
//         res.write('Enter your name : ');
//         res.write('<form action="/welcome" method="POST" ><input name="name" type="text" ><button type="submit" >submit</button> </form>');
//         res.write('</html>')
//         return res.end();
//     }
//     if (url === '/welcome') {
//         const body = [];

//         req.on('data', (chunk) => {
//             body.push(chunk);
//         });

//         return req.on('end', () => {
//             const parseBody = Buffer.concat(body).toString();
//             const name = parseBody.split('=')[1];
//             res.write('Welcome ');
//             res.write(name);
//             res.write(' !');
//             return res.end();

//         });

//     }

// });


const route = require('./route');

const server = http.createServer(route.handler);

console.log(route.text);


server.listen(3000, 'localhost');