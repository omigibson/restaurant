import React from "react";
import Footer from "./Footer";
import { Transition } from "react-spring";
const Menu = () => {
  return (
    <React.Fragment>
      <Transition
        from={{opacity: 0, transition: "all 200ms" }}
        enter={{opacity: 1 }}
        leave={{opacity: 0 }}
      >
      { styles =>
        <div style={ styles } className="menu-container container flex column hcenter">
          <h1>Menu</h1>
          <section>
            <h2>Starters</h2>
            <ul>
              <li>Spring rolls 70:-</li>
              <li>Fried shrimp chips 30:-</li>
              <li>Dumplings. Pork or tofu 80:-</li>
            </ul>
          </section>

          <section>
            <h2>Main Courses</h2>
            <ul>
            <li>Grilled squid with green pepper, ginger and glass noodle salad 180:-</li>
            <li>Vietnamese crepes with beans, onion, coriander and chicken 180 :-</li>
            <li>Rice noodle soup with entrecote and fresh herbs 170:-</li>
            <li>Woked tofu with lemon grass and chives 160:-</li>
            <li>Fried tofubolls with puffed green rice, cashew nuts and glass noodle salad 160:-</li>
            <li>Baguettes with filling. Pork tenderloin, chicken or vegetarian sausage 160:-</li>
            <li>Woked vegetables with rice 150:-</li>
            <li>Tuna prawns on grilled skewers with fried vegetables 170:-</li>
            <li>Fried lotus root in tomato sauce with mango, cucumber and sunflower seeds 170:-</li>
            </ul>
          </section>

          <section>
            <h2>Desserts</h2>
            <ul>
              <li>Coconut icecream with fresh berries 70:-</li>
              <li>Deep fried bananas with vanilla icecream 80:-</li>
              <li>Pannacotta with lime sorbet 80:-</li>
            </ul>
          </section>

          <section>
            <h2>Beverages</h2>
            <ul>
              <li>Soft drinks 40:-</li>
              <li>Beer 50:-</li>
              <li>Wine, red and white 80:-</li>
              <li>Tea 40:-</li>
              <li>Coffee 40:-</li>
            </ul>
          </section>
        </div>
      }
      </Transition>
      <Footer />
    </React.Fragment>
  )
}

export default Menu;
