import React, { Component } from "react";
import "./../css/style.css";
import LandingPage from "./LandingPage";
import About from "./About";
import SelectGuests from "./booking/SelectGuests";
import Admin from "./admin/Admin";
import CancelBooking from "./CancelBooking";
import Menu from "./Menu";
import Logo from "./../images/nanofood-logo.svg";
import {
  Route,
  Link
} from "react-router-dom";
import ProgressBar from "./booking/BookingProgress";

class App extends Component {

  state = {
    activeClass: "Home",
    progressBar: 0
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

  /* We always want the activeClass to change whenever a link is clicked.
  Also the progressBar is set to 0 when clicking a link which causes the
  bar to animate itself to width 0%.  */
  handleChange = (e) => {
    this.setState({ activeClass: [e.target.innerHTML], progressBar: 0 });
  }

  setAppState = (json) => this.setState(json);

  renderLinks = () => {
    /* Our links. */
    const links = ["Home", "Menu", "Booking", "About"];
    return links.map((item, i) => {
      /* Loop through and check what link-item is active. */
      let activeClass = this.state.activeClass.toString() === item ? "active-link active-link-show" : "active-link";
      return (
        <li key={ i } className={ activeClass } onClick={ this.handleChange }>
          <Link to={"/" + item.toLowerCase() }>{ item }</Link>
        </li>
      );
    });
  }

  render() {
    return (
        <div className="outer-container">
          <div className="navbar-container">
            <Link to="/home">
              <div onClick={ () => this.setState({ activeClass: "Home", progressBar: 0 }) } className="logo">
                <img src={ Logo } className="logo" alt="Nano Food logo" />
              </div>
            </Link>
            <header className="navbar-header flex vcenter">
              <ul className="flex">
                { this.renderLinks() }
              </ul>
            </header>
          </div>
            <Route exact={true} path="/" component={LandingPage}/>
              <Route
                path="/home"
                render={(props) => <LandingPage {...props}
                setAppState={ this.setAppState.bind(this) } />}
              />
            <Route path="/about" component={About} />
            <Route
              path="/booking"
              render={(props) => <SelectGuests {...props}
              setAppState={ this.setAppState.bind(this) }
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
            <ProgressBar progressClass={'progress-bar-show-' + this.state.progressBar}/>
        </div>
    );
  }
}

export default App;
