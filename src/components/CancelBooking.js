import React from "react";
import { Transition } from "react-spring";

class CancelBooking extends React.Component {

  state = {
    bookingFetched: false,
    bookingDetails: null,
    deleteSuccess: false
  }

  componentWillMount = () => {
    /* When the component mounts, se if the parameter id is present. If so,
    take the value and use the hash-id to get the data from PHP.  */
    if (this.getParameterByName("id")) {
      this.props.sendToAPI({ hash: this.getParameterByName("id") }, "fetch_booking_with_hash.php")
        .then((booking) => {
          if (booking.length > 0) {
            this.setState({ bookingFetched: true, bookingDetails: booking });
          }
        });
    }
  }

  /* A function that is from StackOverflow. It uses a regex to get parameters and
  returns its value.  */
  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /* Delete the booking and the customer. */
  deleteBookingAndCustomerFromDB = () => {
    this.props.sendToAPI({ hash: this.getParameterByName("id")}, "delete_booking_with_hash.php" )
      .then((response) => {
        this.props.sendToAPI({ hash: this.getParameterByName("id")}, "delete_customer_with_hash.php" )
          .then((response) => {
            this.setState({ deleteSuccess: true });
          })
      });
  }

  render = () => {
    if (this.state.bookingFetched) {
      return (
        <Transition
          from={{opacity: 0, transition: "all 200ms" }}
          enter={{opacity: 1 }}
          leave={{opacity: 0 }}
        >
        { styles =>
          <div className="container">
            <div className="cancel-booking-container hcenter vcenter">
              <h1>Your reservation</h1>
              <div className="booking-details">
                <p> Date: { this.state.bookingDetails[0].date } </p>
                <p> Time: { this.state.bookingDetails[0].time } </p>
                <p> Guests: { this.state.bookingDetails[0].guests } </p>
              </div>
              { !this.state.deleteSuccess ?
                  <button className="red" onClick={ () => {
                      if(window.confirm('Are you sure you want to cancel your reservation?')) {
                        this.deleteBookingAndCustomerFromDB();
                      }
                      else {
                        return;
                      }
                    } }>
                    Cancel booking
                  </button>
                : <p>The reservation has been cancelled.</p>
              }
            </div>
          </div>
        }
        </Transition>
      );
    }
    else {
      return (
        ""
      );
    }
  }
}
export default CancelBooking;
