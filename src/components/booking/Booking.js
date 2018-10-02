import React, { Component, Fragment } from 'react';
import { Map } from 'immutable';
import { Route, Switch, Redirect } from 'react-router-dom';

// Actions
import { requestBookings } from '../../actions/bookings';
import { setViewstate } from '../../actions/viewstate';

//Utilities
import connect from '../../utilities/connect';

// Components
import SelectGuests from './SelectGuests';
import BookingCalendar from './BookingCalendar';
import ContactForm from './ContactForm';
import Confirmation from './Confirmation';
import ProgressBar from "./BookingProgress";

class Booking extends Component {

  state = {
    progressBar: 0
  }

  static defaultProps = {
    currentStep: 1,
    viewstate: Map()
  }

  componentDidMount() {
    this.props.requestBookings();
    this.props.setViewstate('progressBar', 0);
  }

  /* Converts this.state.allBookings from MySQL date-format to something that
  JavaScript can understand through new Date. */

  convertFromStringToDate = (arrayWithBookedDates) => {
    if (arrayWithBookedDates) {
      let alldaysThatAreFull = [];
      arrayWithBookedDates.forEach((date) => {
        alldaysThatAreFull.push(new Date(date));
      });
      return alldaysThatAreFull;
    }
  }

  render() {

    if ( this.props.match.isExact && (this.props.match.url === '/booking' || this.props.match.url === '/booking/') ) {
      return <Redirect to={'/booking/selectguests'} />;
    }
    return(
      <Fragment>
        <Switch>
        <Route exact path={'/booking/selectguests'} component={SelectGuests} />
        <Route exact path={'/booking/calendar'} component={BookingCalendar} />
          <Route exact path={'/booking/contactform'} component={ContactForm} />
          <Route exact path={'/booking/confirmation'} component={Confirmation} />
        </Switch>
        <ProgressBar progressClass={'progress-bar-show-' + this.props.viewstate.get('progressBar')}/>
      </Fragment>
    )
  }
}

export default connect(Booking, { requestBookings, setViewstate }, (store) => ({
  bookings: store.bookings,
  viewstate: store.viewstate
}));
