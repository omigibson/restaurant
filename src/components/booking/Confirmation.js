import React, { Component, Fragment } from "react";
import checkmark from "./../../images/checkmark.svg";

//Utilities
import connect from '../../utilities/connect';

class Confirmation extends Component {
  render = () => {
    return (
      <Fragment>
        <div className="booking-details-container">
          <div className="checkmark-container flex hcenter">
            <img src={ checkmark } alt="checkmark" />
          </div>
          <h2>4/4 Thank you for your reservation!</h2>
          <h3>Details:</h3>
          <div className="booking-details">
            <p><span className="bold">Name:</span> { this.props.viewstate.get('userName') } </p>
            <p><span className="bold">Date:</span> { this.props.viewstate.get('selectedDate') } </p>
            <p><span className="bold">Time:</span> { this.props.viewstate.get('selectedTime') } </p>
            <p><span className="bold">Guests:</span> { this.props.viewstate.get('amountOfGuests') } </p>
          </div>
        </div>
      </Fragment>
    );
  };
}


export default connect(Confirmation, {}, (store) => ({
  viewstate: store.viewstate,
}))
