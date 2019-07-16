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

app.post('/add_artist', function (req, res) {
    console.log(req.body.name);
    artistName = req.body.name;
    artistBirthday = req.body.bday;
    artistLocation = req.body.location;
    sqlServer.addArtist(artistName, artistBirthday, artistLocation);
})

app.post('/add_album', function (req, res) {
    console.log(req.body.album);
    var albumName = req.body.album;
    var artistName = req.body.name;
    var releaseDate = req.body.date;
    var artistId = req.body.id;
    sqlServer.addAlbum(albumName, artistName, releaseDate, artistId);
})

app.post('/search_artists', function (req, res) {
    var search = req.body.search;
    console.log(search);
    var sql = `
        SELECT * FROM artists
        WHERE artist_name LIKE '%` + search + `%'
        LIMIT 20;
    `;
    sqlServer.getQuery(
        sql,
        function(result) {
            res.send(JSON.stringify(result));
            console.log(JSON.stringify(result));
        }
    )
})

app.post('/search_albums', function (req, res) {
    var search = req.body.search;
    console.log(search);
    var sql = `
        SELECT * FROM albums
        WHERE album_name LIKE '%` + search + `%'
        LIMIT 20;
    `
    sqlServer.getQuery(
        sql,
        function(result) {
            res.send(JSON.stringify(result));
            console.log(JSON.stringify(result));
        }
    )
})

app.post('/add_rating', function (req, res) {
    var rating = req.body.rating;
    var albumId = req.body.id;
    var userId = req.body.user;
    var sql = `INSERT INTO ratings (user_id, album_id, rating) VALUES (` + userId +`, ` + albumId + `, ` + rating + `);`;
    sqlServer.getQuery(
        sql,
        function(result) {
            //TODO: second callback here
            var sql = `SELECT AVG(rating) as average, count(rating) as number FROM ratings WHERE album_id=` + albumId + `;`;
            sqlServer.getQuery(
                sql,
                function(result) {
                    avgRating = result[0]["average"];
                    numRating = result[0]["number"];
                    var sql = `UPDATE albums SET avg_rating=` + avgRating + `, num_rating=` + numRating + ` WHERE album_id=` + albumId + `;`;
                    sqlServer.getQuery(
                        sql,
                        function(result) {
                            console.log(albumId);
                        }
                    )
                }
            )
        }
    )
})


//tables: (also in databse_info.txt)
//albums
//artists

var server = app.listen(9000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server running at localhost:%s", port);
})
