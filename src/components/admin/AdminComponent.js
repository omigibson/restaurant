import React from 'react';
import BookingItem from './BookingItem';

class AdminComponent extends React.Component {
    /* State will contain objects that are retreived from MYSQL. convertedBookings
    is the same data, but converted to Date-format. */
    state = {
      allBookings: null,
      convertedBookings: []
    }

    /* Before the component is mounted fetchBookings is called and the result is
    stored in this.state.allBookings. */
    componentWillMount = () => {
      this.fetchBookings()
        .then((bookings) => {
          this.setState({ allBookings: bookings }, () => {
            this.convertBookingstoDates();
            console.log(this.state.allBookings);
          });
        })
    }

    fetchBookings = () => {
      return fetch("http://localhost:8888/fetch_bookings_and_customers.php")
        .then((response) => response.json())
    }

    /* Converts this.state.allBookings from MySQL date-format to something that
    JavaScript can understand through new Date. */
    convertBookingstoDates = (props) => {
      if (this.state.allBookings) {
        let allConvertedBookings = [];
        this.state.allBookings.map((booking) => {
          allConvertedBookings.push(new Date(booking.date));
        });
        this.setState({ convertedBookings: allConvertedBookings }, () => console.log(this.state.convertedBookings));
      }
    }

    sendToAPI = (json, serverFile) => {
      return fetch(`http://localhost:8888/${serverFile}`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(json)
      })
        .then((response) => response.json())
    }

    deleteBooking = (e) => {
      const itemToDelete = {
        itemToDelete: e.target.id
      };

      //Delete booking from DB
      this.sendToAPI(itemToDelete, 'delete_bookings.php');
      console.log(e.target.name);

      //Delete bookig from DOM
      let updatedBookingArray = this.state.allBookings;
      updatedBookingArray.splice(e.target.name, 1);
      this.setState({ allBookings: updatedBookingArray });
    }


      render = () => {
        /* Only render if this.state.convertedBookings returns true. */
        if (this.state.convertedBookings) {
          return (
            <div className="container admin-panel">
              <h2>Upcoming bookings</h2>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>UserID</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Guests</th>
                      <th>Name</th>
                      <th>Telephone</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <BookingItem
                      bookingItems={ this.state.allBookings }
                      onDeleteClick={ this.deleteBooking }
                      updateDB={ this.sendToAPI }
                    />
                  </tbody>
                </table>
          </div>
        );
      } else {
        return null;
      }
    }
  }
export default AdminComponent;
