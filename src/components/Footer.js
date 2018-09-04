import React from "react";
import {
  Link
} from "react-router-dom";

const Footer = () => {
  return(
    <footer>
      <div className="footer__top">
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
        <div><p><small>Terms & Conditions / Privacy Policy © Nano Food AB</small></p></div>
        <div>
          <a href="tel:0812345678"><small>08 — 123 45 678</small></a>
            <a href="email:info@nanofood.io"><small>info@nanofood.io</small></a>
            <a href="http://facebook.com/nanofood"><small>Facebook</small></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
