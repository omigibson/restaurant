import React, { Component } from "react";
import "./../css/style.css";

//Components
import LandingPage from "./LandingPage";
import Booking from "./booking/Booking";
import About from "./About";
import SelectGuests from "./booking/SelectGuests";
import Admin from "./admin/Admin";
import CancelBooking from "./CancelBooking";
import Menu from "./Menu";
import ProgressBar from "./booking/BookingProgress";

import Logo from "./../images/nanofood-logo.svg";
import {
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  state = {
    progressBar: 0
  }

  /* Converts this.state.allBookings from MySQL date-format to something that
  JavaScript can understand through new Date. */

  // convertFromStringToDate = (arrayWithBookedDates) => {
  //   if (arrayWithBookedDates) {
  //     let alldaysThatAreFull = [];
  //     arrayWithBookedDates.forEach((date) => {
  //       alldaysThatAreFull.push(new Date(date));
  //     });
  //     return alldaysThatAreFull;
  //   }
  // }

  /* We always want the activePage to change whenever a link is clicked.
  Also the progressBar is set to 0 when clicking a link which causes the
  bar to animate itself to width 0%.  */
  handleChange = (e) => {
    //dispatch(setActivePage(e.target.innerHTML))
    this.setState({ activePage: [e.target.innerHTML], progressBar: 0 });
  }

  setAppState = (json) => this.setState(json);

  renderLinks = () => {
    /* Our links. */
    const links = ["Home", "Menu", "Booking", "About"];
    return links.map((item, i) => {
      /* Loop through and check what link-item is active. */
      let activePage = this.state.activePage === item ? "active-link active-link-show" : "active-link";
      return (
        <li key={ i } className={ activePage } onClick={ this.handleChange }>
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
              <div onClick={ () => this.setState({ activePage: "Home", progressBar: 0 }) } className="logo">
                <img src={ Logo } className="logo" alt="Nano Food logo" />
              </div>
            </Link>
            <header className="navbar-header flex vcenter">
              <h1>Nano Food</h1>
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
            <Route path="/booking" component={Booking} />
            <Route path="/admin" component={Admin} />
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
