import React from "react";
import foundersImage from "./../images/founding_duo.jpg";
import Footer from "./Footer";

const About = () => {
    return (
      <React.Fragment>
        <div className="landingpage-container aboutpage-container">
            <h1>About Nano Food</h1>
            <section className="landingpage__section aboutpage__section menu flex">

              <div className="image">
                <img src= {foundersImage} />
              </div>

              <div className="text flex">
                <div>
                  <h2>Vietnamese cuisine meets Swedish tradition</h2>
                  <p>Founded in 2002 by best friends Anna Svensson and Gittan Committa, Nano Food is the manifestation of a Vietnamese-Swedish love story.
                  The duo found their passion for seasonal, locally produced food when traveling Vietnam. They then got into prestiguos Hoi An Chef School where they learned how to perfect the art of traditional vietnamese cooking.
                  Back in Sweden, they created their own scandinavian style of the Vietnamese kitchen. Nano Food is simply yhe best of two worlds!
                  </p>
                </div>
              </div>
            </section>
        </div>
        <Footer />
      </React.Fragment>
    );
}
export default About;
