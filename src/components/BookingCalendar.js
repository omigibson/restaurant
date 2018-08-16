import React from 'react';
import BookingCalendar from 'react-booking-calendar';
import ContactForm from "./ContactForm";
import GuestComponent from "./GuestComponent";

class Booking extends React.Component {
  /* State will contain objects that are retreived from MYSQL. convertedBookings
  is the same data, but converted to Date-format. */
  state = {
    allBookings: null,
    convertedBookings: [],
    stepCompleted: false,
    dateSelected: null
  }

  /* Before the component is mounted fetchBookings is called and the result is
  stored in this.state.allBookings. */
  componentWillMount = () => {
    this.fetchBookings()
      .then((bookings) => {
        this.setState({ allBookings: bookings }, () => {
          /* After all the bookings are present in this.state.allBookings they
          are converted to the Date format through the convertBookingtoDates-method. */
          this.convertBookingstoDates();
          this.initiateMonthPaginationEventListeners();
          this.initiateCalendarEventListeners();
        });
      })
  }

  initiateMonthPaginationEventListeners = () => {
    const previousButton = document.getElementsByClassName('icon-previous')[0];
    const nextButton = document.getElementsByClassName('icon-next')[0];
    const paginationButtons = [previousButton, nextButton];
    paginationButtons.map((button) => {
      button.addEventListener('click', () => {
        this.initiateCalendarEventListeners();
      });
    });
  }

  /* Since the npm-package react-booking-calendar doesn't support click-events
  this is a solution that is not very Reactesque, but solves the problem of
  gathering the neccessary data through good old JavaScript. */
  initiateCalendarEventListeners = () => {
    setTimeout(() => {
      let monthAndYear = document.getElementsByClassName("month-label")[0].innerText;
      let dayBox = document.getElementsByClassName("day");
      let arrayFromHTMLCollection = Array.from(dayBox);
      arrayFromHTMLCollection.map((item, i) => {
        item.addEventListener('click', () => {
          let todayDate = item.childNodes[0].innerText;
          let todaysFullDate = new Date(todayDate + ' ' + monthAndYear);
          this.setState({ stepCompleted: true, dateSelected: todaysFullDate });
        });
      });
    }, 100)
  }

  fetchBookings = () => {
    return fetch("http://localhost:8888/fetch_bookings.php")
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
      this.setState({ convertedBookings: allConvertedBookings });
    }
  }

  render = () => {
    /* Only render if this.state.convertedBookings returns true. */
    if (!this.state.stepCompleted) {
      if (this.state.convertedBookings) {
        return (
          <div className="booking-calendar-container">
            <BookingCalendar
            disableHistory={true}
            bookings={this.state.convertedBookings}
            clickable={true}
            />
          </div>
        );
      }
    else {
      return null;
    }
  }
    else {
      return (
        <div className="booking-calendar-container">
          <GuestComponent />
          <p> { this.state.dateSelected.toString() } </p>
          <ContactForm />
        </div>
      )
    }
  }
}

export default Booking;
