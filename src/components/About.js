import React from "react";
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
          <div style={ styles } className="container">
              <h1>About</h1>
          </div>
        }
        </Transition>
        <Footer />
      </React.Fragment>
    );
}
export default About;
