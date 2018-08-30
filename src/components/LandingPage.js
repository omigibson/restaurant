import React from 'react';

import menuImage from './../images/nanofood-2';
import bookingImage from './../images/nanofood-3';
import Footer from './Footer';

const LandingPage = () => {
    return (
        <div className="landingpage-container">

          <section className="jumbotron flex hcenter vcenter">
            <h1>Nano Food</h1>
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
                <button className="green">See our menu</button>
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
                <button className="brown">Book a table</button>
              </div>
            </div>
          </section>
          <Footer />

      </div> /* .landingpage-container */

    );
}
export default LandingPage;
