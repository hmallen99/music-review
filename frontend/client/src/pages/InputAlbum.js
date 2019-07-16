import React, { Component } from 'react';
import BackendAPI from '../BackendAPI';

class InputAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albumName : "",
            releaseDate : "",
            artistName : "",
            artist_id : ""
        };
        this.backend = new BackendAPI();
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
        const url = "http://localhost:9000/add_album";
        var data = {
            album : this.state.albumName,
            date : this.state.releaseDate,
            name : this.state.artistName,
            id : this.state.artistId
        }
        this.backend.postAPI(url, data);
        alert("added album: " + data.album);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Album Name: <input type="text" name="albumName" value={this.state.albumName} onChange={this.handleInput}/><br/>
                        Release Date: <input type="text" name="releaseDate" value={this.state.releaseDate} onChange={this.handleInput} /><br/>
                        Artist Name: <input type="text" name="artistName" value={this.state.artistName} onChange={this.handleInput} /><br/>
                        Artist ID: <input type="text" name="artistId" value={this.state.artistId} onChange={this.handleInput} /><br/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default InputAlbum
