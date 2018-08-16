import React from 'react';
import BookingCalendar from 'react-booking-calendar';

class Booking extends React.Component {

  state = {
    allBookings: null,
    convertedBookings: []
  }

  componentWillMount = () => {
    this.fetchBookings()
      .then((bookings) => {
        this.setState({ allBookings: bookings }, () => {
          this.convertBookingstoDates();
        });
      })
  }

  fetchBookings = () => {
    return fetch("http://localhost:8888/fetch_bookings.php")
      .then((response) => response.json())
  }

  convertBookingstoDates = (props) => {
    if (this.state.allBookings) {
      let allConvertedBookings = [];
      this.state.allBookings.map((booking, i) => {
        allConvertedBookings.push(new Date(booking.date));
      });
      this.setState({ convertedBookings: allConvertedBookings });
    }
  }

  render = () => {
    if (this.state.convertedBookings) {
      return (
        <div className="booking-calendar-container">
          <BookingCalendar bookings={this.state.convertedBookings} clickable={true} />
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default Booking;
