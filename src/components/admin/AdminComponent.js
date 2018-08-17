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
          this.setState({ allBookings: bookings });
        })
    }
    fetchBookings = () => {
      return fetch("http://localhost:8888/fetch_bookings.php")
        .then((response) => response.json())
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
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Name</th>
                    <th>Telephone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <BookingItem BookingItem={ this.state.allBookings } />
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
