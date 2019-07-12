import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import BackendAPI from './BackendAPI';
import Home from './pages/Home';
import InputArtist from './pages/InputArtist';
import ArtistPage from './pages/ArtistPage';
import InputAlbum from './pages/InputAlbum';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: <Home />
        };
        this.pages = {
            "Home" : <Home />,
            "InputArtist" : <InputArtist />,
            "ArtistPage" : <ArtistPage />
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

    goToHome() {
        return <Home/>;
    }

    goToInputArtist() {
        return <InputArtist/>;
    }

    goToArtist() {
        return <ArtistPage/>;
    }

    goToInputAlbum() {
        return <InputAlbum />
    }

    render() {
        return (
            <Router>
                <div>
                    <Link to="/">
                        <button>Home</button>
                    </Link>

                    <Link to="/input_artist">
                        <button>Add Artist</button>
                    </Link>

                    <Link to="/input_album">
                        <button>Add Album</button>
                    </Link>

                    <Link to="/artist">
                        <button>Artist</button>
                    </Link>



                    <Route path="/artist" component={this.goToArtist} />
                    <Route path="/input_artist" component={this.goToInputArtist} />
                    <Route exact path="/" component={this.goToHome} />
                    <Route path="/input_album" component={this.goToInputAlbum} />
                </div>
            </Router>
        );
    }
}

export default App;
