import React from 'react';

class CancelBooking extends React.Component {

  state = {
    bookingFetched: false,
    bookingDetails: null,
    deleteSuccess: false
  }

  componentWillMount = () => {
    if (this.getParameterByName('id')) {
      this.props.sendToAPI({ hash: this.getParameterByName('id') }, 'fetch_booking_with_hash.php')
        .then((booking) => {
          if (booking.length > 0) {
            this.setState({ bookingFetched: true, bookingDetails: booking });
          }
        });
    }
  }

  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  deleteBookingAndCustomerFromDB = () => {
    this.props.sendToAPI({ hash: this.getParameterByName('id')}, 'delete_booking_with_hash.php' )
      .then((response) => {
        this.props.sendToAPI({ hash: this.getParameterByName('id')}, 'delete_customer_with_hash.php' )
          .then((response) => {
            this.setState({ deleteSuccess: true });
          })
      });
  }

  render = () => {
    if (this.state.bookingFetched) {
      return (
        <React.Fragment>
          <h1>Your reservation</h1>
          <p> Date: { this.state.bookingDetails[0].date } </p>
          <p> Time: { this.state.bookingDetails[0].time } </p>
          <p> Guests: { this.state.bookingDetails[0].guests } </p>
          { !this.state.deleteSuccess ?
              <React.Fragment>
                <button onClick={ () => this.deleteBookingAndCustomerFromDB() }>
                  Cancel booking
                </button>
              </React.Fragment>
            : <p>The reservation has been cancelled.</p>
          }
        </React.Fragment>
      );
    }
    else {
      return (
        ''
      );
    }
  }
}
export default CancelBooking;
