import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BackendAPI from './BackendAPI';
import Home from './pages/Home';
import InputArtist from './pages/InputArtist';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: <Home />
        };
        this.pages = {
            "home" : <Home />,
            "InputArtist" : <InputArtist />
        };
        this.loadPage = this.loadPage.bind(this);
        this.backend = new BackendAPI();
    }

    loadPage(e) {
        const newPage = e.target.name;
        this.setState({page: this.pages[newPage]});
    }

    componentDidMount() {
        this.backend.callAPI();
        console.log('mounted!');
    }

    render() {
        return (
            <div>
                <div>
                    <button>
                        Home
                    </button>
                    <button
                        name="InputArtist"
                        onClick={this.loadPage}>
                        Add Artist
                    </button>
                </div>
                {this.state.page}
            </div>
        );
    }
}

export default App;
