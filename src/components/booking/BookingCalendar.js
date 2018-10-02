import React, { Component, Fragment } from "react";
import { Redirect } from 'react-router-dom';
// import Calendar from "react-booking-calendar";
import Calendar from 'react-calendar'; // https://github.com/wojtekmaj/react-calendar
import { Transition } from "react-spring";
import { List } from 'immutable';

// Actions
import { setViewstate } from '../../actions/viewstate';

//Utilities
import connect from '../../utilities/connect';

//Components
import ChooseTime from "./ChooseTime";

// Selectors
import { getBookedDates, getBookingsPerDateAndTime } from '../../selectors/calendarSelectors';

class BookingCalendar extends Component {

  static defaultProps = {
    fullyBookedDates: List()
  }

  //Ska inte selectedDate och selectedTime sparas i storen via viewstate reducern?
  state = {
    stepCompleted: false,
    // selectedDate: new Date(),
    hasSelectedDate: false,
    // selectedTime: ''
  }

  handleOnDateChange = (date) => {
    this.props.setViewstate('selectedDate', this.convertDateObjectToString(date));
    this.setState(() => ({
      // selectedDate: date,
      hasSelectedDate: true
    }))
  }

  handleOnTimeChange = (time) => {
    this.props.setViewstate('selectedTime', time);
    this.setState(() => ({ stepCompleted: true }))
  }

  decideIfTileShouldBeDisabled = ({activeStartDate, date, view }) => {

    const dateString = `${date.getYear()}-${date.getMonth()}-${date.getDay()}`;

    // Disable if less then todays date
    if ( date.getDay() > new Date().getDay() ) {
      return false;
    }

    // Disable if the date is contained in the fully booked array of dates
    if ( this.props.fullyBookedDates.contains(dateString) ) {
      return true;
    }

    return false;
  }

  convertDateObjectToString = (dateObject) => {
    const yyyy = dateObject.getFullYear().toString();
    const mm = (dateObject.getMonth() + 101).toString().slice(-2);
    const dd = (dateObject.getDate() + 100).toString().slice(-2);
    return yyyy + "-" + mm + "-" + dd;
  }

  render() {

    if ( this.state.stepCompleted ) {
      return <Redirect to={'/booking/contactform'} />
    }

    const chooseTime = this.state.hasSelectedDate ? <ChooseTime onChange={this.handleOnTimeChange} /> : null;

    return (
      <Fragment>
        <Transition
          from={{right: "-50%", position: "absolute", transform: "translateX(100%)" }}
          enter={{right: "50%", transform: "translateX(50%)" }}
          leave={{ transform: "translateX(-200%)" }}
        >
        { styles =>

          <div className="booking-step container flex vcenter column" style={styles}>
            <h2>2/4 Select time and date</h2>
            <Calendar
              value={this.state.selectedDate}
              onChange={this.handleOnDateChange}
              tileDisabled={this.decideIfTileShouldBeDisabled}
            />
            {chooseTime}
          </div>
        }
        </Transition>
      </Fragment>
    );
  }

}

export default connect(BookingCalendar, { setViewstate }, (store) => ({
  bookings: store.bookings,
  viewstate: store.viewstate,
  fullyBookedDates: getBookedDates(store),
  bookingsPerDateAndTime: getBookingsPerDateAndTime(store)
}))
