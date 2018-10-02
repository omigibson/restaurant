import React, { Component, Fragment } from "react";
import { Redirect } from 'react-router-dom';
import Calendar from 'react-calendar';
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

  state = {
    stepCompleted: false,
    hasSelectedDate: false
  }

  componentDidMount() {
    this.props.setViewstate('progressBar', 33);
  }

  handleOnDateChange = (date) => {
    this.props.setViewstate('selectedDate', this.convertDateObjectToString(date));
    this.setState(() => ({
      hasSelectedDate: true
    }))
  }

  handleOnTimeClick = (time) => {
    this.props.setViewstate('selectedTime', time);
    this.setState(() => ({ stepCompleted: true }))
  }

  decideIfTileShouldBeDisabled = ({activeStartDate, date, view = 'month' }) => {

    const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${('0' + date.getDate()).slice(-2)}`;
    // Disable if the date is contained in the fully booked array of dates
    if ( this.props.fullyBookedDates.toJS().hasOwnProperty(dateString) ) {
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
    console.log(this.props.fullyBookedDates.toJS())

    if ( this.state.stepCompleted ) {
      return <Redirect to={'/booking/contactform'} />
    }

    const chooseTime = this.state.hasSelectedDate ? <ChooseTime onClick={this.handleOnTimeClick} /> : null;

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
              minDate={new Date()}
              showNeighboringMonth={false}
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
