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
    res.send('Welcome!');
})

app.get('/list_artists', function (req, res) {
    var sql = `
        SELECT * FROM artists;
    `;
    sqlServer.getQuery(
        sql,
        function(result) {
            res.send(result[0].artist_name);
        }
    )
})

app.get('/delete', function (req, res) {
    sqlServer.deleteColumn(
        function(result) {
            console.log(result);
        }
    )
})

app.post('/add_album', function (req, res) {
    console.log(req.body.album);
    var albumName = req.body.album;
    var artistName = req.body.name;
    var releaseDate = req.body.date;
    sqlServer.addAlbum(albumName, artistName, releaseDate);
})

app.post('/search_artists', function (req, res) {
    var search = req.body.search;
    console.log(search);
    var sql = `
        SELECT * FROM artists
        WHERE artist_name LIKE '%` + search + `%'
    `;
    sqlServer.getQuery(
        sql,
        function(result) {
            res.send(JSON.stringify(result));
            console.log(JSON.stringify(result));
        }
    )
})

app.post('/add_artist', function (req, res) {
    console.log(req.body.name);
    artistName = req.body.name;
    artistBirthday = req.body.bday;
    artistLocation = req.body.location;
    sqlServer.addArtist(artistName, artistBirthday, artistLocation);
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
