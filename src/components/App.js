import React, { Component } from 'react';
import logo from './../logo.svg';
import './../css/style.css';

class App extends Component {
  componentWillMount = () => {
    /* The promise is resolved and we console log response. */ 
    this.fetchAPI()
      .then((bookings) => {
        console.log(bookings);
      });
  }

  /* Fetches the fetch_bookings.php from the server folder and returns
  the promise.  */
  fetchAPI = () => {
    return fetch('http://localhost:8888/fetch_bookings.php')
      .then((response) => response.json())
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Godaste restaurangen!! :-)))</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
