import React from "react";
import PropTypes from 'prop-types';

//Components
import Bookings from "./Bookings";

//Actions
import { requestBookings } from '../../actions/bookings';
import { requestDeleteBooking } from '../../actions/bookings';
import { saveBookingRequest } from '../../actions/bookings'

//Utilities
import connect from '../../utilities/connect';

class Admin extends React.Component {
    /* State will contain objects that are retreived from MYSQL. convertedBookings
    is the same data, but converted to Date-format. */
    state = {
      //convertedBookings: [],
      updatedBooking: {}
    }

    componentDidMount() {
      this.props.requestBookings();
    }

    // /* Before the component is mounted fetchBookings is called and the result is
    // stored in this.state.allBookings. */
    // componentWillMount = () => {
    //   this.props.fetchBookings("fetch_bookings_and_customers.php")
    //     .then((bookings) => {
    //       this.setState({ allBookings: bookings }, () => {
    //         const convertedBookings = this.props.convertFromStringToDate(bookings);
    //         this.setState({ convertedBookings });
    //     })
    //   })
    // }

    /*******************************************/
    /************* DELETE BOOKING **************/
    /*******************************************/

    deleteBooking = (event) => {
      // console.log(event.target.id);
      this.props.requestDeleteBooking(event.target.id);

      // Delete booking from DB
      //this.props.sendToAPI(itemToDelete, "delete_bookings.php");

      // Delete bookig from DOM
      // let updatedBookingArray = this.state.allBookings;
      // updatedBookingArray.splice(e.target.name, 1);
      // this.setState({ allBookings: updatedBookingArray });
    }

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
                    // onEdit={ this.editBooking }
                    // handleEdit={ this.handleEdit }
                    onSave={ this.onSave }
                    onDelete={ this.deleteBooking }
                    // isEditing={ this.state.editing }
                    // bookingToEdit={ this.state.bookingToEdit }
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
