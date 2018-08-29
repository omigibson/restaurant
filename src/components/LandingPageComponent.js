import React from 'react';
const LandingPage = () => {
    return (
        <div className="landingpage-container">

          <section className="jumbotron">
            <h1>Nano Food</h1>
          </section>

          <section className="landingpage__section menu">

            <div className="image"></div>

            <div className="text">
              <h2>Vietnamese cuisine meets Swedish tradition</h2>
              <p>Vietnamese cuisine meets Swedish tradition.
                  Vietnamese cuisine meets Swedish tradition.
                  Vietnamese cuisine meets Swedish tradition.
              </p>
            </div>
          </section>

          <section className="landingpage__section booking">

            <div className="image"></div>

            <div className="text">
              <h2>Breakfast, lunch or dinner?</h2>
              <p>You are welcome at any time. You are welcome at any time.
              You are welcome at any time. You are welcome at any time. </p>
            </div>
          </section>
          <footer>
            <div className="footer__top flex">
              <div className="address">
                <h3>Find us</h3>
                <address>
                  <p>Street 18</p>
                  <p>121 12 City of Dreams</p>
                  <p>COUNTRY</p>
                </address>
              </div>
              <div className="our-story">
                <h3>Our story</h3>
                <p>
                    Founded in 2002 by Anna Svensson and Gittan Committa,
                    Nano Food is the manifestation of a Vietnamese-Swedish
                    love story. Seasonal, locally produced produce is our passion.
                </p>
                <p>Read the full story.</p>
              </div>
            </div>
            <hr />
            <div className="footer__bottom flex space-between">
              <div><small>Terms & Conditions / Privacy Policy © Nano Food AB</small></div>
              <div>
                <a href="tel:0812345678">08 — 123 45 678</a>
                <a href="email:info@nanofood.io">info@nanofood.io</a>
                <a href="http://facebook.com/nanofood">Facebook</a>
              </div>
            </div>
          </footer>

      </div> /* .landingpage-container */

    );
}
export default LandingPage;
