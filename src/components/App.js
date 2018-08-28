import React, { Component } from "react";
import "./../css/style.css";
import About from "./AboutComponent";
import GuestComponent from "./GuestComponent";
import Admin from "./admin/AdminComponent";
import CancelBooking from "./CancelBooking";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  /* Sends JSON to our back-end. */
  sendToAPI = (json, fileName) => {
    return fetch(`http://localhost:8888/${fileName}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(json)
    })
      .then((response) => response.json())
  }

  fetchBookings = (fileName) => {
    return fetch(`http://localhost:8888/${fileName}`)
      .then((response) => response.json())
  }

  /* Converts this.state.allBookings from MySQL date-format to something that
  JavaScript can understand through new Date. */

  convertFromStringToDate = (arrayWithBookedDates) => {
    if (arrayWithBookedDates) {
      let alldaysThatAreFull = [];
      arrayWithBookedDates.forEach((date) => {
        alldaysThatAreFull.push(new Date(date));
      });
      return alldaysThatAreFull;
    }
  }

  render() {
    return (
      <Router>
        <div className="outer-container">
          <div className="navbar-container">
            <header className="navbar-header">
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/booking">Booking</Link></li>
              </ul>
            </header>

            <Route path="/about" component={About} />
            <Route
              path='/booking'
              render={(props) => <GuestComponent {...props}
              fetchBookings={ this.fetchBookings }
              convertFromStringToDate={ this.convertFromStringToDate }
              sendToAPI={ this.sendToAPI } />}
            />
            <Route
              path='/admin'
              render={(props) => <Admin {...props}
              fetchBookings={ this.fetchBookings }
              convertFromStringToDate={ this.convertFromStringToDate }
              sendToAPI={ this.sendToAPI } />}
            />
            <Route
              path='/cancel'
              render={(props) => <CancelBooking {...props}
              sendToAPI={ this.sendToAPI } />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
