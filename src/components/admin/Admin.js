import React from "react";

//Components
import Bookings from "./Bookings";

//Actions
import { requestBookings } from '../../actions/admin';
import { requestDeleteBooking } from '../../actions/admin';
import { saveBookingRequest } from '../../actions/admin'

//Utilities
import connect from '../../utilities/connect';

class Admin extends React.Component {

    componentDidMount() {
      this.props.requestBookings();
    }

    /************* DELETE BOOKING **************/

    deleteBooking = (event) => {
      this.props.requestDeleteBooking(event.target.id);
    }

    /************* SAVE UPDATED BOOKING **************/

    onSave = (bookingCopy) => {
      this.props.saveBookingRequest(bookingCopy);
    }

    render() {
      return (
        <div className="admin-container">
          <div className="admin-panel">
            <h2>Bookings</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Name</th>
                    <th>Telephone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <Bookings
                    bookings={ this.props.bookings }
                    onSave={ this.onSave }
                    onDelete={ this.deleteBooking }
                  />
                </tbody>
              </table>
        </div>
      </div>
    );
    }
  }

export default connect(Admin, { requestBookings, requestDeleteBooking, saveBookingRequest }, (store) => ({
  bookings: store.bookings
}));
