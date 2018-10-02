import React, { Component } from "react";
import "./../css/style.css";

//Components
import LandingPage from "./LandingPage";
import Booking from "./booking/Booking";
import About from "./About";
import Admin from "./admin/Admin";
import CancelBooking from "./CancelBooking";
import Menu from "./Menu";

import Logo from "./../images/nanofood-logo.svg";
import {
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  state = {

  }

  // We always want the activePage to change whenever a link is clicked.
  handleChange = (e) => {
    this.setState({ activePage: [e.target.innerHTML]});
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
              <div onClick={ () => this.setState({ activePage: "Home"}) } className="logo">
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
        </div>
    );
  }
}

export default App;
