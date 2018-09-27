import React from "react";
import { Transition } from "react-spring";

// Actions
import { updateViewstate } from '../../actions/bookings';

//Utilities
import connect from '../../utilities/connect';

// Selectors
import { getControlledBookings } from '../../selectors/calendarSelectors';

class ChooseTime extends React.Component {

  state = {
    stepCompleted: false
  }

  handleChange = (event) => {
    this.props.updateViewstate( 'timeSelected', event.target.value);
    this.setState({ stepCompleted: true });
  };

  /* If the selected date doesn't exist in the object (it only consists of dates that have bookings),
  create that date so it can be used for comparison in render. */
  checkIfNoBookingForDateAndTime = (datesAndTimes, dateSelected) => {
    if(!datesAndTimes[dateSelected]) {
      datesAndTimes = { [dateSelected]: { 18: { notBookable: false, bookings: [] }, 21: { notBookable: false, bookings: [] } } };
      return datesAndTimes[dateSelected];
    }
    return datesAndTimes[dateSelected];
  };

  render = () => {
    // const dateSelected = props.convertDateObjectToString(props.dateSelected);
    // const datesAndTimes = checkIfNoBookingForDateAndTime(props.datesAndTimes, dateSelected);
    return (
      <Transition
        from={{opacity: 0 }}
        enter={{opacity: 1 }}
        leave={{opacity: 0 }}
      >
        { styles =>
          <div className="booking-step select-time-container" style={styles}>
            <h2>Select what time to dine</h2>
            { !this.props.datesAndTimes["18"]["notBookable"] ?
              <button
                className="amount-of-button"
                value="18"
                name="timeSelected"
                onClick={ this.handleChange.bind(this) }>18.00
              </button> : ""
            }
            { !this.props.datesAndTimes["21"]["notBookable"] ?
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
  };
}

export default connect(ChooseTime, { updateViewstate }, (store) => ({
  viewstate: store.viewstate,
  datesAndTimes: getControlledBookings(store)
}))
