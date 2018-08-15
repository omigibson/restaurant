import React, { Component } from 'react';
import logo from './../logo.svg';
import './../css/style.css';

class App extends Component {
  componentWillMount = () => {
    this.fetchAPI();
  }

  fetchAPI = () => {
    fetch('http://localhost:8888/fetch_bookings.php')
      .then((response) => response.json())
        .then((json) => {
          console.log(json);
        })
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
