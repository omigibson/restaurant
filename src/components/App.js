import React, { Component } from "react";
import "./../css/style.css";

import Hello from "./HelloComponent";
import About from "./AboutComponent";
import BookingCalendar from "./BookingCalendar";
import Login from "./admin/LoginComponent";
import Admin from "./admin/AdminComponent";


import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  componentWillMount = () => {
    /* Calls the postToAPI-function and resolved the promise. */
    // this.postToAPI()
    //   .then((response) => {
    //     console.log(response);
    //   })
    //     .catch((error) => {
    //       console.log(error);
    //     })
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
        <div className="outer-container">
          <div className="navbar-container">
            <header className="navbar-header">
              <ul>
                <li><Link to="/hello">Hello</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/booking">Booking</Link></li>
              </ul>
            </header>



            <Route path="/hello" component={Hello} />
            <Route path="/about" component={About} />
            <Route path="/booking" component={BookingCalendar} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
