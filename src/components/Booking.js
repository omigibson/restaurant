import React from 'react';
import Calendar from 'react-booking-calendar';
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
          const bookingsPerDateAndTime = this.sortBookingsPerDate();
          const controlledBookings = this.controlIfDateOrTimesAreBooked(bookingsPerDateAndTime);
          this.ifDateOrTimesAreBooked(controlledBookings);
          this.initiateMonthPaginationEventListeners();
          this.initiateCalendarEventListeners();
        });
      })
  }

  sortBookingsPerDate = () => {
    const allBookings = this.state.allBookings;
    let bookingsPerDateAndTime = {};
    for (let i = 0; i < allBookings.length; i++) {
      if (!bookingsPerDateAndTime[allBookings[i].date]) {
        bookingsPerDateAndTime[allBookings[i].date] = { '18': [], '21': [] };
      }
      const oldArray = bookingsPerDateAndTime[allBookings[i].date][allBookings[i].time];
      bookingsPerDateAndTime[allBookings[i].date][allBookings[i].time] = [...oldArray, allBookings[i].date];
    }
    return bookingsPerDateAndTime;
  }

  controlIfDateOrTimesAreBooked = (object) => {
    for (let key in object) {
      if (object[key]['18'].length >= 15) {
        object[key]['18'] = { fullyBooked: true, bookings: object[key]['18'] }
      }
      else {
        object[key]['18'] = { fullyBooked: false, bookings: object[key]['18'] }
      }
      if (object[key]['21'].length >= 15) {
        object[key]['21'] = { fullyBooked: true, bookings: object[key]['21'] }
      }
      else {
        object[key]['21'] = { fullyBooked: false, bookings: object[key]['21'] }
      }
    }
    return object;
  }

  ifDateOrTimesAreBooked = (object) => {
    let datesThatAreFullyBooked = [];
    for (let key in object) {
      if(object[key]['21'].fullyBooked && object[key]['18'].fullyBooked) {
        console.log(`The day ${key} is fully booked for both.`);
        datesThatAreFullyBooked.push(key);
        continue;
      }
      if(object[key]['18'].fullyBooked) {
        console.log(`The day ${key} and time 18 is fully booked.`);
      }
      if(object[key]['21'].fullyBooked) {
        console.log(`The day ${key} and time 21 is fully booked.`);
      }
    }
    const convertToDateFormat = this.convertFromStringToDate(datesThatAreFullyBooked);
    this.setState({ convertedBookings: convertToDateFormat })
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
  convertFromStringToDate = (arrayWithBookedDates) => {
    if (arrayWithBookedDates) {
      let allConvertedBookings = [];
      arrayWithBookedDates.map((date) => {
        allConvertedBookings.push(new Date(date));
      });
      return allConvertedBookings;
    }
  }

  render = () => {
    /* Only render if this.state.convertedBookings returns true. */
    if (!this.state.stepCompleted) {
      if (this.state.convertedBookings) {
        return (
          <div className="booking-calendar-container">
            <Calendar
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
        <ContactForm bookingDetails={ {
            dateSelected: this.state.dateSelected,
            amountOfGuests: this.props.amountOfGuests
        } } />
      )
    }
  }
}

export default Booking;
