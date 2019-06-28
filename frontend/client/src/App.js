import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "Hello" };
    }

    callAPI() {
        console.log('hello');
        fetch("http://localhost:9000/abcd")
            .then(res => res.text())
            .then(res => this.setState({apiResponse : res}))
            .catch(err => err);
    }

    postAPI(url, data) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-type': 'application/json'
            }
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.log('Error:', error));
    }

    componentDidMount() {
        console.log('mounted!');
        this.callAPI();
        var data = {name : 'Felix Allen'}
        this.postAPI("http://localhost:9000/add_artist", data);
    }

    render() {
        return(
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                {this.state.apiResponse}
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        );
    }
}

export default App;
