import React from "react";
import { Transition } from "react-spring";

class ChooseTime extends React.Component {

  /* Sets the state of the parent component. */
  handleChange = (e) => {
    this.props.setBookingState({ [e.target.name]: e.target.value, stepCompleted: true });
  }

  /* If the selected date doesn't exist in the object (it only consists of dates that have bookings),
  create that date so it can be used for comparison in render. */ 
  checkIfNoBookingForDateAndTime = (datesAndTimes, dateSelected) => {
    if(!datesAndTimes[dateSelected]) {
      datesAndTimes = { [dateSelected]: { 18: { isBookable: false, bookings: [] }, 21: { isBookable: false, bookings: [] } } }
      return datesAndTimes[dateSelected];
    }
    return datesAndTimes[dateSelected];
  }

  render = () => {
    const dateSelected = this.props.convertDateObjectToString(this.props.dateSelected);
    const datesAndTimes = this.checkIfNoBookingForDateAndTime(this.props.datesAndTimes, dateSelected);
    return (
      <Transition
        from={{opacity: 0 }}
        enter={{opacity: 1 }}
        leave={{opacity: 0 }}
      >
      { styles =>
        <div className="booking-step select-time-container" style={styles}>
          <h2>Select what time to dine</h2>
            { !datesAndTimes["18"]["isBookable"] ?
                <button
                  className="amount-of-button"
                  value="18"
                  name="timeSelected"
                  onClick={ this.handleChange.bind(this) }>18.00
                </button> : ""
            }
            { !datesAndTimes["21"]["isBookable"] ?
                <button
                  className="amount-of-button"
                  value="21"
                  name="timeSelected"
                  onClick={ this.handleChange.bind(this) }>21.00
                </button> : ""
            }
        </div>
      }
      </Transition>
    );
  }
}

export default ChooseTime;
