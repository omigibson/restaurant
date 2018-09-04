import React from "react";
import checkmark from "./../../images/checkmark.svg";

class Confirmation extends React.Component {

  componentWillMount = () => {
    this.props.setAppState({ progressBar: 100 });
  }

  render = () => {
    return (
      <React.Fragment>
        <div className="booking-details-container">
          <div className="checkmark-container flex hcenter">
            <img src={ checkmark } alt="checkmark" />
          </div>
          <h2>4/4 Thank you for your reservation!</h2>
          <h3>Details:</h3>
          <div className="booking-details">
            <p><span className="bold">Name:</span> { this.props.name } </p>
            <p><span className="bold">Date:</span> { this.props.date } </p>
            <p><span className="bold">Time:</span> { this.props.time } </p>
            <p><span className="bold">Guests:</span> { this.props.guests } </p>
          </div>
        </div>
    </React.Fragment>
    );
  }
}

export default Confirmation;
