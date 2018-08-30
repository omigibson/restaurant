import React from 'react';

import menuImage from './../images/nanofood-2';
import bookingImage from './../images/nanofood-3';
import logo from './../images/nanofood-logo.svg';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="landingpage-container">

          <section className="jumbotron flex hcenter vcenter column">
            <div className="container-logo">
              <img src={ logo } alt="Nano Food logo" />
            </div>
            <h2>Welcome to our Vietnamese-Swedish kitchen</h2>
          </section>

          <section className="landingpage__section menu flex">

            <div className="image">
              <img src={ menuImage } />
            </div>

            <div className="text flex">
              <div>
                <h2>Vietnamese cuisine meets Swedish tradition</h2>
                <p>Vietnamese cuisine meets Swedish tradition.
                    Vietnamese cuisine meets Swedish tradition.
                    Vietnamese cuisine meets Swedish tradition.
                </p>
                <Link to="/menu" className="button green">See our menu</Link>
              </div>
            </div>
          </section>

          <section className="landingpage__section booking flex">

            <div className="image">
              <img src={ bookingImage } />
            </div>

            <div className="text flex">
              <div>
                <h2>Breakfast, lunch or dinner?</h2>
                <p>You are welcome at any time. You are welcome at any time.
                You are welcome at any time. You are welcome at any time. </p>
                <Link to="/booking" className="button brown">Book a table</Link>
              </div>
            </div>
          </section>
          <Footer />

      </div> /* .landingpage-container */

    );
}
export default LandingPage;
