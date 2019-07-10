import React, { Component } from 'react';
import BackendAPI from '../BackendAPI';
import Artist from './Artist';

class ArtistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName : "",
            artists : "",
            apiResponse : []
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backend = new BackendAPI(); //Probably Not Needed
        this.artistComponent = new Artist();
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
        //alert(this.state.artists);
        this.search();
        e.preventDefault();
    }


    search() {
        const url = "http://localhost:9000/search_artists";
        var data = {
            search : this.state.searchName
        }
        fetch(url, {
            method : 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => response.json())
        .then(response => this.setState({apiResponse : JSON.stringify(response)}))
        .then(response => this.listArtists(response))
        .catch(error => console.log('Error'))
    }

    listArtists() {
        var artistList = [];
        var response = JSON.parse(this.state.apiResponse);
        for (var i = 0; i < response.length; i++) {
            var artist = response[i]["artist_name"];
            var bday = response[i]["birthday"];
            var loc = response[i]["location"];
            //alert(artist, bday, location);
            artistList.push(<Artist info={{
                artistName : artist,
                birthday : bday,
                location : loc
            }}/>);
            //alert(artistList.length);
        }
        this.setState({artists : artistList});
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search For Artist: <input type="text" name="searchName" value={this.state.searchName} onChange={this.handleInput} /><br/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {this.state.artists}
            </div>
        );
    }
}

export default ArtistPage
