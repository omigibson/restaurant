import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Actions
import { requestBookings, checkWhichDatesAreFull } from '../../actions/bookings';

//Utilities
import connect from '../../utilities/connect';

// Components
import SelectGuests from './SelectGuests';
import BookingCalendar from './BookingCalendar';
import ChooseTime from './ChooseTime';
import ContactForm from './ContactForm';
import Confirmation from './Confirmation';

class Booking extends Component{
  defaultProps = {
    bookingStatus: 'selectguests'
  }

  componentDidMount() {
    this.props.requestBookings();
}

  render(){
    if (this.props.bookingStatus === 'selectguests') {
        return <Redirect to={`/booking/selectguests`} />;
}
  return(
      <Switch>
        <Route exact path={`/booking/selectguests`} component={SelectGuests} />
        <Route exact path={'/booking/calendar'} component={BookingCalendar} />
        <Route exact path={'/booking/choosetime'} component={ChooseTime} />
        <Route exact path={'/booking/contactform'} component={ContactForm} />
        <Route exact path={'/booking/confirmation'} component={Confirmation} />
      </Switch>
    )
  }
}

export default connect(Booking, { requestBookings, checkWhichDatesAreFull }, (store) => ({
  bookings: store.bookings
}));
