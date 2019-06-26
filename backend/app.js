const http = require('http');
var mysql = require('mysql');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

var text = fs.readFileSync('database_info.txt');
var credentials = text.toString().split("\r\n");

var con = mysql.createConnection({
    host: credentials[0],
    user: credentials[1],
    password: credentials[2],
    database: credentials[3]
});

//tables: (also in databse_info.txt)
//albums
//artists

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `
        SELECT * FROM artists;
    `;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
    })
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
