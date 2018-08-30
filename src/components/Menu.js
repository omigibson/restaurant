import React from 'react';

const Menu = () => {
  return (
    <div className="menu-container flex column vcenter">
      <h1>Menu</h1>
      <section>
        <h2>Starters</h2>
        <ul>
          <li>Spring rolls <span className="price">70:-</span></li>
          <li>Fried shrimp chips <span className="price">30:-</span></li>
          <li>Dumplings. Pork or tofu <span className="price">80:-</span></li>
        </ul>
      </section>

      <section>
        <h2>Main Courses</h2>
        <ul>
        <li>Grilled squid with green pepper, ginger and glass noodle salad</li>
        <li>Vietnamese crepes with beans, onion, coriander and chicken</li>
        <li>Rice noodle soup with entrecote and fresh herbs</li>
        <li>Woked tofu with lemon grass and chives</li>
        <li>Fried tofubolls with puffed green rice, cashew nuts and glass noodle salad</li>
        <li>Baguettes with filling. Pork tenderloin, chicken or vegetarian sausage</li>
        <li>Woked vegetables with rice</li>
        <li>Tuna prawns on grilled skewers with fried vegetables</li>
        <li>Fried lotus root in tomato sauce with mango, cucumber and sunflower seeds</li>
        </ul>
      </section>

      <section>
        <h2>Desserts</h2>
        <ul>
          <li>Coconut icecream with fresh berries</li>
          <li>Deep fried bananas with vanilla icecream</li>
          <li>Pannacotta with lime sorbet</li>
        </ul>
      </section>

      <section>
        <h2>Beverages</h2>
        <ul>
          <li>Soft drinks</li>
          <li>Beer</li>
          <li>Wine, red and white</li>
          <li>Tea</li>
          <li>Coffee</li>
        </ul>
      </section>
    </div>
  )
}

export default Menu;
