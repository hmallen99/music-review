exports.myQuery = class Query {
    constructor() {
        var mysql = require('mysql');
        const fs = require('fs');
        var outData;
        var text = fs.readFileSync('database_info.txt');
        var credentials = text.toString().split("\r\n");
        this.con = mysql.createConnection({
            host: credentials[0],
            user: credentials[1],
            password: credentials[2],
            database: credentials[3]
        });
    }

    getQuery(sql, callback) {
        this.con.query(sql, function(err, result) {
            if (err) throw err;
            return callback(result);
        });
    }

    deleteColumn(callback) {
        var sql = 'DELETE FROM artists';
        this.con.query(sql, function(err, result) {
            if (err) throw err;
            return callback(result);
        })
    }

    addArtist(artistName, birthday, location) {
        var artistInsertColumns = `INSERT INTO artists(
            artist_name,
            birthday,
            location
        )`;
        var artistInsertValues = `Values (`.concat(
            '"', artistName, '",',
            '"', birthday, '",',
            '"', location, '"',
            ');'
        );
        var artistInsertQuery = artistInsertColumns.concat(artistInsertValues);
        this.con.query(artistInsertQuery, function(err) {
            if (err) throw err;
            console.log("added artist");
        });
    }

    addAlbum(albumName, artistName, releaseDate) {
        var albumInsertColumns = `Insert INTO albums(
            album_name,
            artist_name,
            release_date
        )`;
        var albumInsertValues = `Values (`.concat(
            '"', albumName, '",',
            '"', artistName, '",',
            '"', releaseDate, '"',
            ');'
        );
        var albumInsertQuery = albumInsertColumns.concat(albumInsertValues);
        this.con.query(albumInsertQuery, function(err) {
            if (err) throw err;
            console.log("added album");
        })
    }
}
