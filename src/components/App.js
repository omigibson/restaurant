import React, { Component } from "react";
import "./../css/style.css";

import Hello from "./HelloComponent";
import About from "./AboutComponent";
import GuestComponent from "./GuestComponent";
import Booking from "./Booking";
import Login from "./admin/LoginComponent";
import Admin from "./admin/AdminComponent";
import CancelBooking from "./CancelBooking";


import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  componentWillMount = () => {

  }

  /* Posts the object inside JSON.stringify to our post_Booking.php file. */
  postToAPI = () => {
    return fetch("http://localhost:8888/post_Booking.php", {
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
        <div className="outer-container">
          <div className="navbar-container">
            <header className="navbar-header">
              <ul>
                <li><Link to="/hello">Hello</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/Booking">Booking</Link></li>
              </ul>
            </header>



            <Route path="/hello" component={Hello} />
            <Route path="/about" component={About} />
            <Route path="/Booking" component={GuestComponent} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/cancel" component={CancelBooking} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
