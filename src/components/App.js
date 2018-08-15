import React, { Component } from "react";
import "./../css/style.css";

import Hello from "./HelloComponent";
import About from "./AboutComponent";
import Booking from "./BookingComponent";
import BookingCalendar from "./BookingCalendar";

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  state = {
    bookings: null
  }

  componentWillMount = () => {
    /* The promise is resolved and we console log response. */
    this.fetchAPI()
      .then((bookings) => {
        this.setState({ bookings: bookings });
      });

    /* Calls the postToAPI-function and resolved the promise. */
    this.postToAPI()
      .then((response) => {
        console.log(response);
      })
        .catch((error) => {
          console.log(error);
        })
  }

  /* Fetches the fetch_bookings.php from the server folder and returns
  the promise.  */
  fetchAPI = () => {
    return fetch("http://localhost:8888/fetch_bookings.php")
      .then((response) => response.json())
  }

  /* Posts the object inside JSON.stringify to our post_booking.php file. */
  postToAPI = () => {
    return fetch("http://localhost:8888/post_booking.php", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        date: "2018-08-15",
        time: "21",
        userID: "2"
      })
    })
      .then((response) => response.json())
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
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
          <div className="booking-calendar-container">
            <BookingCalendar bookings={ this.state.bookings } />
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
