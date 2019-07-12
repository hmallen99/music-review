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
        return (
            <div>
                <h2>{info.artistName}</h2>
                <h3>{info.location}</h3>
                <h4>{info.birthday}</h4>
            </div>
        );
    }
}

export default Artist
