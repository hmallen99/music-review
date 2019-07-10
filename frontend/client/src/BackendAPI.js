class BackendAPI {
    constructor() {
        this.state = {
            apiResponse: "Hello"
        };
    }

    callAPI() {
        console.log('hello');
        fetch("http://localhost:9000/list_artists")
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
        })
        .then(response => response.json())
        .catch(error => console.log('Error:', error));
    }

}

export default BackendAPI
