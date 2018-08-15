import React, { Component } from 'react';
import logo from './../logo.svg';
import './../css/style.css';

import Hello from './HelloComponent';
import About from './AboutComponent';
import Booking from './BookingComponent';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

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
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Godaste restaurangen!! :-)))</h1>
            <ul>
               <li><Link to="/hello">Hello</Link></li>
               <li><Link to="/about">About</Link></li>
               <li><Link to="/booking">Booking</Link></li>
            </ul>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          <Route path="/hello" component={Hello} />
          <Route path="/about" component={About} />
          <Route path="/booking" component={Booking} />

        </div>
      </Router>
    );
  }
}

export default App;
