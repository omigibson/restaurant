import React from "react";

import menuImage from "./../images/nanofood-2";
import bookingImage from "./../images/nanofood-3";
import logo from "./../images/nanofood-logo.svg";
import Footer from "./Footer";
import {
  Link
} from "react-router-dom";
import { Transition } from "react-spring";

const LandingPage = (props) => {
    return (
      <Transition
        from={{opacity: 0, transition: "all 200ms" }}
        enter={{opacity: 1 }}
        leave={{opacity: 0 }}
      >
      { styles =>
        <div style={ styles } className="landingpage-container">

          <section className="landingpage__section menu flex">

            <div className="image">
              <img src={ menuImage } alt="food"/>
            </div>

            <div className="text flex">
              <div>
                <h2>Vietnamese cuisine meets Swedish tradition</h2>
                <p>Vietnamese cuisine meets Swedish tradition.
                    Vietnamese cuisine meets Swedish tradition.
                    Vietnamese cuisine meets Swedish tradition.
                </p>
                <Link
                  onClick={ () => props.setAppState({ activeClass: "Menu" }) }
                  to="/menu"
                  className="button green">
                  See our menu
                </Link>
              </div>
            </div>
          </section>

          <section className="landingpage__section booking flex">

            <div className="image">
              <img src={ bookingImage } alt="dinner" />
            </div>

            <div className="text flex">
              <div>
                <h2>Breakfast, lunch or dinner?</h2>
                <p>You are welcome at any time. You are welcome at any time.
                You are welcome at any time. You are welcome at any time. </p>
                <Link
                  onClick={ () => props.setAppState({ activeClass: "Booking" }) }
                  to="/booking"
                  className="button brown">
                  Book a table
                </Link>
              </div>
            </div>
          </section>
          <Footer />

      </div> /* .landingpage-container */
    }
    </Transition>

    );
}
export default LandingPage;
