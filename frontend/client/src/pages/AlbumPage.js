import React, { Component } from 'react';
import Album from './Album';

class AlbumPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName : "",
            albums : "",
            apiResponse : []
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        this.search();
        e.preventDefault();
    }

    goToAlbumPage(info) {
        this.setState({albums : <Album info={info}/>});
    }

    search() {
        const url = "http://localhost:9000/search_albums";
        var data = {
            search : this.state.searchName
        }
        fetch(url, {
            method : 'POST',
            body : JSON.stringify(data),
            headers: {
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
        .then(response => this.setState({apiResponse : JSON.stringify(response)}))
        .then(response => this.listAlbums(response))
        .catch(error => console.log('Error'))
    }

    renderAlbum(info) {
        return(
            <div>
                <button onClick={() => this.goToAlbumPage(info)}>
                    <h2>{info.albumName}</h2>
                    <h3>{info.artistName}</h3>
                </button>
            </div>
        )
    }

    listAlbums() {
        var albumList = [];
        var response = JSON.parse(this.state.apiResponse);
        for (var i = 0; i < response.length; i++) {
            var info = {
                albumName : response[i]["album_name"],
                releaseDate : response[i]["release_date"],
                avgRating : response[i]["avg_rating"],
                numRating : response[i]["num_rating"],
                artistName : response[i]["artist_name"],
                ratingsList : response[i]["ratings"],
                bio : response[i]["bio"],
                reviews : response[i]["reviews"],
                id : response[i]['album_id']
            };

            albumList.push(this.renderAlbum(info));
        }
        this.setState({albums : albumList});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search For Album: <input type="text" name="searchName" value={this.state.searchName} onChange={this.handleInput} /><br/>
                    </label>

                    <input type="submit" value="Submit" />
                </form>
                {this.state.albums}
            </div>
        )
    }
}

export default AlbumPage
