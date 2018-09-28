import React, { Component, Fragment } from 'react';
import { Map } from 'immutable';
import { Route, Switch, Redirect } from 'react-router-dom';

// Actions
import { requestBookings, updateViewstate } from '../../actions/bookings';

//Utilities
import connect from '../../utilities/connect';

// Components
import SelectGuests from './SelectGuests';
import BookingCalendar from './BookingCalendar';
import ContactForm from './ContactForm';
import Confirmation from './Confirmation';

class Booking extends Component {

  static defaultProps = {
    currentStep: 1,
    viewstate: Map()
  }

  componentDidMount() {
    this.props.requestBookings();
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

  // convertDateObjectToString = () => {
  //
  //   const dateObject = this.props.viewstate.get('dateSelected');
  //   const yyyy = dateObject.getFullYear().toString();
  //   const mm = (dateObject.getMonth() + 101).toString().slice(-2);
  //   const dd = (dateObject.getDate() + 100).toString().slice(-2);
  //   return yyyy + "-" + mm + "-" + dd;
  // }


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
      </Fragment>
    )
  }
}

export default connect(Booking, { requestBookings, updateViewstate }, (store) => ({
  bookings: store.bookings,
  viewstate: store.viewstate
}));
