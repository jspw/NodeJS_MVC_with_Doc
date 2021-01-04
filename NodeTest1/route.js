const fileSystem = require('fs');

const requestHandle = (req, res) => {
    const url = req.url;

    if (url === '/') {
        res.write('<html>');

        res.write('<form method="POST" action="/welcome" ><input type="text" name="name" ><button type="submit" >Enter</button></form>')

        res.write('</html>');
        return res.end();
    }

    if (url === '/welcome') {

        const data = [];


        req.on('data', (chunk) => {
            data.push(chunk);

        });

        return req.on('end', () => {
            const parseData = Buffer.concat(data).toString();
            const name = parseData.split('=')[1];
            res.write('Welcome ');
            res.write(name);
            return res.end();
        });

    }
}

// module.exports  = requestHandle;

// module.exports = {
//     handler:requestHandle,
//     text:"Saniaaah"
// }


// module.exports.handler = requestHandle;
// module.exports.text = "Saniaaah";

exports.handler = requestHandle;
exports.text = "Saniaaah";
