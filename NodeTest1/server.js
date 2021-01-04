const http = require('http');
const fs = require('fs');

// method1
// function rqListener(req,res){

// }
// http.createServer(rqListener);


// method 2 (annonymous function)
// http.createServer(function(req,res){

// });

// method 3(ES6)

const server = http.createServer((req, res) => {
    // console.log(req);
    // console.log(res);

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<h1>Hello</h1>');
        res.write('<form action="/message" method="POST" ><input  type="text" name="message"><button type="submit">Send</button></form>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {

        const body = [];

        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            console.log(message);
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt',message,err => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            })
        });
    }


    // process.exit();
});

server.listen(3000);