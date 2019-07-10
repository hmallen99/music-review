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
                <button>
                    <ul>
                        <li>{info.artistName}</li>
                        <li>{info.birthday}</li>
                        <li>{info.location}</li>
                    </ul>
                </button>
            </div>
        );
    }
}

export default Artist
