import React from "react";
import checkmark from "./../../images/checkmark.svg";
const Confirmation = (props) => {
  return (
    <div className="booking-details-container">
      <div className="checkmark-container flex hcenter">
        <img src={ checkmark } alt="checkmark" />
      </div>
      <h1>Thank you for your reservation!</h1>
      <h2>Details:</h2>
      <div className="booking-details">
        <p><span className="bold">Name:</span> { props.name } </p>
        <p><span className="bold">Date:</span> { props.date } </p>
        <p><span className="bold">Time:</span> { props.time } </p>
        <p><span className="bold">Guests:</span> { props.guests } </p>
      </div>
    </div>
  );
}

export default Confirmation;
