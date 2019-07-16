import React, { Component } from 'react';


class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistName : 'default',
            rating : 0,
            albumId: 0
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
        alert(this.state.rating);
        const url = "http://localhost:9000/add_rating";
        var data = {
            id : this.props.info.id,
            rating : this.state.rating,
            user : 0
        }
        fetch(url, {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-type' : 'application/json'
            }
        })
        e.preventDefault();
    }

    render() {
        const info = this.props.info;
        var bio = info.bio;
        if (!bio) {
            bio = "This album does not have a bio yet";
        }
        return (
            <div>
                <h2>{info.albumName}</h2>
                <h3>{info.artistName}</h3>
                <h4>{info.releaseDate}</h4>
                <p>Average Rating: {info.avgRating} <br/></p>
                <p>Number of Ratings: {info.numRating} <br/></p>
                <p>Bio: {bio} <br/></p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Rate Album : <input type="text" name="rating" value={this.state.rating} onChange={this.handleInput}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Album
