import React from 'react';
import Calendar from 'react-booking-calendar';
import ContactForm from "./ContactForm";
import ChooseTime from "./ChooseTime";
import { Transition } from 'react-spring';

class Booking extends React.Component {
  /* State will contain objects that are retreived from MYSQL. daysThatAreFull
  is the same data, but converted to Date-format. */
  state = {
    allBookings: [],
    daysThatAreFull: [],
    datesAndTimes: {},
    stepCompleted: false,
    decideWhatTime: false,
    dateSelected: null,
    bookingsPerDate: null,
    timeSelected: null,
  }

  /* Before the component is mounted fetchBookings is called and the result is
  stored in this.state.allBookings. */
  componentWillMount = () => {
    this.props.fetchBookings('fetch_bookings.php')
      .then((bookings) => {
        this.setState({ allBookings: bookings }, () => {
          /* After all the bookings are present in this.state.allBookings they
          are converted to the Date format through the convertBookingtoDates-method. */
          const bookingsPerDateAndTime = this.sortBookingsPerDate();
          const controlledBookings = this.controlIfDateOrTimesAreBooked(bookingsPerDateAndTime);
          this.setState({ datesAndTimes: controlledBookings }, () => {
            this.setState({ daysThatAreFull: this.ifDateOrTimesAreBooked() }, () => {
              this.initiateMonthPaginationEventListeners();
              this.initiateCalendarEventListeners();
            })
          });
        });
      })
  }

  /* Takes a JS-Date object and converts it to yyyy-mm-dd.  */
  convertDateObjectToString = (dateObject) => {
    const yyyy = dateObject.getFullYear().toString();
    const mm = (dateObject.getMonth() + 101).toString().slice(-2);
    const dd = (dateObject.getDate() + 100).toString().slice(-2);
    return yyyy + '-' + mm + '-' + dd;
  }

  /* Takes the array from state and loops through it. Sorts based on date and time.  */
  sortBookingsPerDate = () => {
    const allBookings = this.state.allBookings;
    /* Empty object that will contain all dates with bookings. */
    let bookingsPerDateAndTime = {};
    for (let i = 0; i < allBookings.length; i++) {
      /* If the date doesn't already exist, create it (object) and add both '18' and '21' (arrays). */
      if (!bookingsPerDateAndTime[allBookings[i].date]) {
        bookingsPerDateAndTime[allBookings[i].date] = { '18': [], '21': [] };
      }
      /* Make a copy of the array */
      const oldArray = bookingsPerDateAndTime[allBookings[i].date][allBookings[i].time];
      /* Add the new value into the array */
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

  /*  */
  ifDateOrTimesAreBooked = () => {
    const object = this.state.datesAndTimes;
    let datesThatAreFullyBooked = [];
    for (let key in object) {
      if(object[key]['21'].fullyBooked && object[key]['18'].fullyBooked) {
        datesThatAreFullyBooked.push(key);
        continue;
      }
    }
    const convertToDateFormat = this.props.convertFromStringToDate(datesThatAreFullyBooked);
    return convertToDateFormat;
  }

  initiateMonthPaginationEventListeners = () => {
    const previousButton = document.getElementsByClassName('icon-previous')[0];
    const nextButton = document.getElementsByClassName('icon-next')[0];
    const paginationButtons = [previousButton, nextButton];
    paginationButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.initiateCalendarEventListeners();
      });
    });
  }

  /* Since the npm-package react-booking-calendar doesn't support click-events
  this is a solution that is not very Reactesque, but solves the problem of
  gathering the neccessary data through good old JavaScript. */
  initiateCalendarEventListeners = () => {
    /* A small timeout is used because the DOM isn't updated quickly enough.
    This solved that problem, and is hardly noticeable for the user. */
    setTimeout(() => {
      let monthAndYear = document.getElementsByClassName("month-label")[0].innerText;
      let dayBox = document.getElementsByClassName("day");
      let arrayFromHTMLCollection = Array.from(dayBox);
      arrayFromHTMLCollection.forEach((item) => {
        /* The only way to know if a date is booked is through the CSS-class.
        If it contains booked-day, don't add an event listener. */
        if (!item.classList.contains('booked-day')) {
          item.addEventListener('click', () => {
            let todayDate = item.childNodes[0].innerText;
            let todaysFullDate = new Date(todayDate + ' ' + monthAndYear);
            this.setState({ decideWhatTime: true, dateSelected: todaysFullDate });
          });
        }
      });
    }, 100)
  }

  setBookingState = (object) => this.setState(object);

  render = () => {
    /* Only render if this.state.daysThatAreFull returns true. */
    if (!this.state.stepCompleted) {
      if (this.state.daysThatAreFull) {
        return (
          <Transition
            from={{right: '-50%', position: 'absolute', transform: 'translateX(100%)' }}
            enter={{right: '50%', transform: 'translateX(50%)' }}
            leave={{ transform: 'translateX(-200%)' }}
          >
          { styles =>
            <div className="booking-calendar-container" style={styles}>
              <Calendar
                disableHistory={true}
                bookings={this.state.daysThatAreFull}
                clickable={true}
              />
              { this.state.decideWhatTime && <ChooseTime
                setBookingState={ this.setBookingState.bind(this) }
                datesAndTimes={ this.state.datesAndTimes }
                dateSelected={ this.state.dateSelected }
                convertDateObjectToString={ this.convertDateObjectToString }
                /> }
            </div>
          }
          </Transition>
        );
      }
    else {
      return null;
    }
  }
    else {
      return (
        <Transition
          from={{right: '-50%', position: 'absolute', transform: 'translateX(100%)' }}
          enter={{right: '50%', transform: 'translateX(50%)' }}
          leave={{ transform: 'translateX(-200%)' }}
        >
        { styles =>
            <ContactForm
              style={styles}
              convertDateObjectToString={ this.convertDateObjectToString }
              sendToAPI={ this.props.sendToAPI }
              bookingDetails={ {
                dateSelected: this.state.dateSelected,
                timeSelected: this.state.timeSelected,
                amountOfGuests: this.props.amountOfGuests
            } }
            />
        }
      </Transition>
      )
    }
  }
}

export default Booking;
