import React from 'react';

const Menu = () => {
  return (
    <div className="menuContainer">
      <h1>Menu</h1>
      <div>
        <h2>Starters</h2>
        <ul>
          <li>Spring rolls</li>
          <li>Fried shrimp chips</li>
          <li>Dumplings. Pork or tofu</li>
        </ul>
      </div>

      <div>
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
      </div>

      <div>
        <h2>Desserts</h2>
        <ul>
          <li>Coconut icecream with fresh berries</li>
          <li>Deep fried bananas with vanilla icecream</li>
          <li>Pannacotta with lime sorbet</li>
        </ul>
      </div>

      <div>
        <h2>Beverages</h2>
        <ul>
          <li>Soft drinks</li>
          <li>Beer</li>
          <li>Wine, red and white</li>
          <li>Tea</li>
          <li>Coffee</li>
        </ul>
      </div>
    </div>
  )
}

export default Menu;
