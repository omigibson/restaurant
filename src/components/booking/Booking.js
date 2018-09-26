import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Actions
import { requestBookings, checkWhichDatesAreFull, updateViewstate } from '../../actions/bookings';

//Utilities
import connect from '../../utilities/connect';

// Components
import SelectGuests from './SelectGuests';
import BookingCalendar from './BookingCalendar';
import ChooseTime from './ChooseTime';
import ContactForm from './ContactForm';
import Confirmation from './Confirmation';

class Booking extends Component {

  defaultProps = {
    currentStep: 1
  }

  componentDidMount() {
    this.props.requestBookings();
  }

  render() {

    if ( this.props.match.isExact && (this.props.match.url === '/booking' || this.props.match.url === '/booking/') ) {
      return <Redirect to={'/booking/selectguests'} />;
    }
    return(
      <Fragment>
        <Switch>
        <Route
          exact={true}
          path='/booking/selectguests'
          render={(props) => <SelectGuests {...props}
          updateViewstate={ this.props.updateViewstate } />}
          />
          <Route exact path={'/booking/calendar'} component={BookingCalendar} />
          <Route exact path={'/booking/choosetime'} component={ChooseTime} />
          <Route exact path={'/booking/contactform'} component={ContactForm} />
          <Route exact path={'/booking/confirmation'} component={Confirmation} />
        </Switch>
      </Fragment>
    )
  }
}

export default connect(Booking, { requestBookings, checkWhichDatesAreFull, updateViewstate }, (store) => ({
  bookings: store.bookings
}));
