import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
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

    goToArtistPage(info) {
        this.setState({artists : <Artist info = {info} />})
    }

    renderArtist(info) {
        return (
                <div>
                    <button onClick={() => this.goToArtistPage(info)}>
                            <h2>{info.artistName}</h2>
                            <h3>{info.location}</h3>
                    </button>
                </div>

        );
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
            var info = {
                artistName : response[i]["artist_name"],
                birthday : response[i]["birthday"],
                location : response[i]["location"]
            };

            //alert(artist, bday, location);
            artistList.push(this.renderArtist(info));
            //alert(artistList.length);
        }
        this.setState({artists : artistList});
        //return artistList;
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
