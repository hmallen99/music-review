// Modules
var express = require('express');
var query = require('./query');
var cors = require('cors');

//Module set-up

var sqlServer = new query.myQuery();

var app = express();

app.use(cors());
app.use(express.json());
app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('/abcd', function (req, res) {
    sqlServer.getQuery(
        function(result) {
            res.send('testing123');
        }
    )
    //res.send('abracadabra');
})

app.get('/delete', function (req, res) {
    sqlServer.deleteColumn(
        function(result) {
            console.log(result);
        }
    )
})

app.post('/add_artist', function (req, res) {
    console.log(req.body.name);
})

//tables: (also in databse_info.txt)
//albums
//artists
function getData() {
    sqlServer.getQuery(
        function(result) {
            console.log(result);
        }
    );
}


var server = app.listen(9000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server running at localhost:%s", port);
})
