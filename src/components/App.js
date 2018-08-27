import React, { Component } from "react";
import "./../css/style.css";
import About from "./AboutComponent";
import GuestComponent from "./GuestComponent";
import Login from "./admin/LoginComponent";
import Admin from "./admin/AdminComponent";
import CancelBooking from "./CancelBooking";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  /* Posts the object inside JSON.stringify to our post_Booking.php file. */
  sendToAPI = (json, fileName) => {
    return fetch(`http://localhost:8888/${fileName}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(json)
    })
      .then((response) => response.json())
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
              sendToAPI={ this.sendToAPI } />}
            />
            <Route path="/login" component={Login} />
            <Route
              path='/admin'
              render={(props) => <Admin {...props}
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
