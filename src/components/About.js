import React from "react";
import foundersImage from "./../images/founding_duo.jpg";
import Footer from "./Footer";
import { Transition } from "react-spring";

const About = () => {
    return (
      <React.Fragment>
        <Transition
          from={{opacity: 0, transition: "all 200ms" }}
          enter={{opacity: 1 }}
          leave={{opacity: 0 }}
        >
        { styles =>
          <div style={ styles } className="aboutpage-container">
            <h1>Story of Nano Food</h1>
            <section className="aboutpage__section menu flex">

              <div className="image">
                <img src= {foundersImage} />
              </div>

              <div className="text flex">
                <div>
                  <h2>Vietnamese cuisine meets Swedish tradition</h2>
                  <p>Founded in 2002 by best friends Anna Svensson and Gittan Committa, Nano Food is the manifestation of a Vietnamese-Swedish love story.
                  The duo found their passion for seasonal, locally produced food when traveling Vietnam. They then got into prestiguos Hoi An Chef School where they learned how to perfect the art of traditional vietnamese cooking.
                  Back in Sweden, they created their own scandinavian style of the Vietnamese kitchen. Nano Food is simply the best of two worlds!
                  </p>
                </div>
              </div>
            </section>
        </div>
      }
      </Transition>
        <Footer />
      </React.Fragment>
    );
}
export default About;
