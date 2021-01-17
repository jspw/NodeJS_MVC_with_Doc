const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'test',
    database:'testdb',
    password:'test123',

});


module.exports = pool.promise();