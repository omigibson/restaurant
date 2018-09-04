import React from "react";
import ProgressBar from "./BookingProgress";
import checkmark from "./../../images/checkmark.svg";
const Confirmation = (props) => {
  return (
    <React.Fragment>
      <div className="booking-step booking-details-container">
        <div className="checkmark-container flex hcenter">
          <img src={ checkmark } alt="checkmark" />
        </div>
        <h2>4/4 Thank you for your reservation!</h2>
        <h3 className="confirmation">Details:</h3>
        <div className="booking-details">
          <p><span className="bold">Name:</span> { props.name } </p>
          <p><span className="bold">Date:</span> { props.date } </p>
          <p><span className="bold">Time:</span> { props.time } </p>
          <p><span className="bold">Guests:</span> { props.guests } </p>
        </div>
      </div>
  </React.Fragment>
  );
}

export default Confirmation;
