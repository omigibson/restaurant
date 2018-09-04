import React from "react";
import {
  Link
} from "react-router-dom";

const Footer = () => {
  return(
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
          <Link to="/about"><p>Read the full story.</p></Link>
        </div>
      </div>
      <hr />
      <div className="footer__bottom flex space-between">
        <div><small>Terms & Conditions / Privacy Policy © Nano Food AB</small></div>
        <div>
          <small>
            <a href="tel:0812345678">08 — 123 45 678</a>
            <a href="email:info@nanofood.io">info@nanofood.io</a>
            <a href="http://facebook.com/nanofood">Facebook</a>
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
