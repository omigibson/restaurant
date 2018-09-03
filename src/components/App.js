import React, { Component } from "react";
import "./../css/style.css";
import LandingPage from "./LandingPage";
import About from "./About";
import SelectGuests from "./booking/SelectGuests";
import Admin from "./admin/AdminComponent";
import CancelBooking from "./CancelBooking";
import Menu from "./Menu";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  state = {
    activeClass: "Home"
  }

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

  handleChange = (e) => {
    this.setState({ activeClass: [e.target.innerHTML] });
  }

  renderLinks = () => {
    /* Our links. */
    const links = ["Home", "Menu", "Booking", "About"];
    return links.map((item, i) => {
      /* Loop through and check what link-item is active. */
      let activeClass = this.state.activeClass.toString() === item ? "active-link" : " ";
      return (
        <li key={ i } className={ activeClass } onClick={ this.handleChange }>
          <Link to={"/" + item.toLowerCase() }>{ item }</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <Router>
        <div className="outer-container">
          <div className="navbar-container">
            <header className="navbar-header flex hcenter">
              <ul className="flex">
                { this.renderLinks() }
              </ul>
            </header>


            <Route path="/home" component={LandingPage} />

            <Route path="/about" component={About} />
            <Route
              path="/booking"
              render={(props) => <SelectGuests {...props}
              fetchBookings={ this.fetchBookings }
              convertFromStringToDate={ this.convertFromStringToDate }
              sendToAPI={ this.sendToAPI } />}
            />
            <Route
              path="/admin"
              render={(props) => <Admin {...props}
              fetchBookings={ this.fetchBookings }
              convertFromStringToDate={ this.convertFromStringToDate }
              sendToAPI={ this.sendToAPI } />}
            />
            <Route
              path="/cancel"
              render={(props) => <CancelBooking {...props}
              sendToAPI={ this.sendToAPI } />}
            />
            <Route path="/menu" component={Menu} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
