import React, { Component } from 'react';
import BackendAPI from '../BackendAPI';

class InputArtist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistName : "",
            birthday : "",
            location : ""
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
        alert(this.state.artistName);
        const url = "http://localhost:9000/add_artist";
        var data = {
            name : this.state.artistName,
            bday : this.state.birthday,
            location : this.state.location
        }
        this.backend.postAPI(url, data);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Artist Name: <input type="text" name="artistName" value={this.state.artistName} onChange={this.handleInput}/><br/>
                        Birthday: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleInput} /><br/>
                        Artist Location: <input type="text" name="location" value={this.state.location} onChange={this.handleInput} /><br/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default InputArtist
