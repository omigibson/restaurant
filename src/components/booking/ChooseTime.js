import React from "react";
import { Transition } from "react-spring";

const ChooseTime = (props) => {

  /* Sets the state of the parent component. */
  const handleChange = (e) => {
    props.setBookingState({ [e.target.name]: e.target.value, stepCompleted: true });
  }

  /* If the selected date doesn't exist in the object (it only consists of dates that have bookings),
  create that date so it can be used for comparison in render. */
  const checkIfNoBookingForDateAndTime = (datesAndTimes, dateSelected) => {
    if(!datesAndTimes[dateSelected]) {
      datesAndTimes = { [dateSelected]: { 18: { notBookable: false, bookings: [] }, 21: { notBookable: false, bookings: [] } } }
      return datesAndTimes[dateSelected];
    }
    return datesAndTimes[dateSelected];
  }

    const dateSelected = props.convertDateObjectToString(props.dateSelected);
    const datesAndTimes = checkIfNoBookingForDateAndTime(props.datesAndTimes, dateSelected);
    return (
      <Transition
        from={{opacity: 0 }}
        enter={{opacity: 1 }}
        leave={{opacity: 0 }}
      >
      { styles =>
        <div className="booking-step select-time-container" style={styles}>
          <h2>Select what time to dine</h2>
            { !datesAndTimes["18"]["notBookable"] ?
                <button
                  className="amount-of-button"
                  value="18"
                  name="timeSelected"
                  onClick={ handleChange.bind(this) }>18.00
                </button> : ""
            }
            { !datesAndTimes["21"]["notBookable"] ?
                <button
                  className="amount-of-button"
                  value="21"
                  name="timeSelected"
                  onClick={ handleChange.bind(this) }>21.00
                </button> : ""
            }
        </div>
      }
      </Transition>
    );
}

export default ChooseTime;
