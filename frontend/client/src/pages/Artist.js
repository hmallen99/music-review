import React, {Component} from 'react';

class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistName : 'default',
            birthday : '0000-00-00',
            location : 'NYC, NY'
        }
    }

    render() {
        const info = this.props.info;
        var bio = info.bio;
        if (!bio) {
            bio = "This artist does not have a bio yet";
        }
        return (
            <div>
                <h2>{info.artistName}</h2>
                <h3>{info.location}</h3>
                <h4>{info.birthday}</h4>
                <p>Average Rating: {info.avgRating} <br/></p>
                <p>Number Of Ratings: {info.numRating} <br/></p>
                <p>Bio: {bio} <br/></p>
            </div>
        );
    }
}

export default Artist
