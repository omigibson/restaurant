import React from "react";
import Calendar from "react-booking-calendar";
import { Transition } from "react-spring";

//Components
import ChooseTime from "./ChooseTime";
import ContactForm from "./ContactForm";

//Actions
import { requestBookings, checkWhichDatesAreFull } from '../../actions/bookings';

//Utilities
import connect from '../../utilities/connect';

class BookingCalendar extends React.Component {
  /* State will contain objects that are retreived from MYSQL. daysThatAreFull
  is the same data, but converted to Date-format. */
  state = {
    // allBookings: [],
    daysThatAreFull: [],
    datesAndTimes: {},
    stepCompleted: false,
    decideWhatTime: false,
    dateSelected: null,
    bookingsPerDate: null,
    timeSelected: null
  }

  componentDidMount() {
  }

  /* Takes a JS-Date object and converts it to yyyy-mm-dd.  */
  convertDateObjectToString = (dateObject) => {
    const yyyy = dateObject.getFullYear().toString();
    const mm = (dateObject.getMonth() + 101).toString().slice(-2);
    const dd = (dateObject.getDate() + 100).toString().slice(-2);
    return yyyy + "-" + mm + "-" + dd;
  }

  /* Takes the array from state and loops through it. Sorts based on date and time.  */
  // sortBookingsPerDate = () => {
  //   const allBookings = this.state.allBookings;
  //   /* Empty object that will contain all dates with bookings. */
  //   let bookingsPerDateAndTime = {};
  //   for (let i = 0; i < allBookings.length; i++) {
  //     /* If the date doesn"t already exist, create it (object) and add both "18" and "21" (arrays). */
  //     if (!bookingsPerDateAndTime[allBookings[i].date]) {
  //       bookingsPerDateAndTime[allBookings[i].date] = { "18": [], "21": [] };
  //     }
  //     /* Make a copy of the array */
  //     const oldArray = bookingsPerDateAndTime[allBookings[i].date][allBookings[i].time];
  //     /* Add the new value into the array */
  //     bookingsPerDateAndTime[allBookings[i].date][allBookings[i].time] = [...oldArray, allBookings[i].date];
  //   }
  //   return bookingsPerDateAndTime;
  // }

  // controlIfDatesAreBookedOrPassed = (object) => {
  //   for (let key in object) {
  //     /* Constructs a new Date where the clock stands at 02:00. */
  //     const dateOfBooking = new Date(key);
  //     /* We add 16 and 19 to those numbers (the time for the sittings 18:00 and 21:00) */
  //     const firstSitting = dateOfBooking.setHours(dateOfBooking.getHours() + 16);
  //     const secondSitting = dateOfBooking.setHours(dateOfBooking.getHours() + 19);
  //     /* Control if the time for the sitting at 18:00 has passed. */
  //     if (this.controlIfDateIsPassed(firstSitting)) {
  //         object[key]["18"] = { notBookable: true, bookings: object[key]["18"] }
  //     }
  //     else if (object[key]["18"].length >= 15) {
  //       object[key]["18"] = { notBookable: true, bookings: object[key]["18"] }
  //     }
  //     else {
  //       object[key]["18"] = { notBookable: false, bookings: object[key]["18"] }
  //     }
  //     /* Control if the time for the sitting at 21:00 has passed. */
  //     if (this.controlIfDateIsPassed(secondSitting)) {
  //         object[key]["21"] = { notBookable: true, bookings: object[key]["21"] }
  //     }
  //     else if (object[key]["21"].length >= 15) {
  //       object[key]["21"] = { notBookable: true, bookings: object[key]["21"] }
  //     }
  //     else {
  //       object[key]["21"] = { notBookable: false, bookings: object[key]["21"] }
  //     }
  //   }
  //   return object;
  // }

  /* Check if the object in state contains a date with full bookings. */
  ifDateOrTimesAreBooked = () => {
    const object = this.state.datesAndTimes;
    let datesThatArenotBookable = [];
    for (let key in object) {
      if(object[key]["21"].notBookable && object[key]["18"].notBookable) {
        datesThatArenotBookable.push(key);
        continue;
      }
    }
    const convertToDateFormat = this.props.convertFromStringToDate(datesThatArenotBookable);
    return convertToDateFormat;
  }

  /* Initiates initiateCalendarEventListeners() when paginating between months. */
  initiateMonthPaginationEventListeners = () => {
    const previousButton = document.getElementsByClassName("icon-previous")[0];
    const nextButton = document.getElementsByClassName("icon-next")[0];
    const paginationButtons = [previousButton, nextButton];
    paginationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        /* A small timeout is used because the DOM isn"t updated quickly enough.
        This solved that problem, and is hardly noticeable for the user. */
        setTimeout(() => {
          this.initiateCalendarEventListeners();
        }, 50)
      });
    });
  }

  // controlIfDateIsPassed = (date) => date < Date.now() ? true : false;

  /* Since the npm-package react-booking-calendar doesn"t support click-events
  this is a solution that is not very Reactesque, but solves the problem of
  gathering the neccessary data through good old JavaScript. */
  initiateCalendarEventListeners = () => {
      const monthAndYear = document.getElementsByClassName("month-label")[0].innerText;
      const dayBox = document.getElementsByClassName("day");
      const arrayFromHTMLCollection = Array.from(dayBox);
      arrayFromHTMLCollection.forEach((item) => {
        const todayDate = item.childNodes[0].innerText;
        const todaysFullDate = new Date(todayDate + " " + monthAndYear);
        /* A date will only be bookable if it"s before 21 the current day. */
        const todayWithHourRestriction = todaysFullDate.setHours(todaysFullDate.getHours() + 21);
        /* The only way to know if a date is booked is through the CSS-class.
        If it contains booked-day, don"t add an event listener. */
        if (!item.classList.contains("booked-day")) {
          if (!this.controlIfDateIsPassed(todayWithHourRestriction)) {
            item.addEventListener("click", () => {
              this.setState({ decideWhatTime: true, dateSelected: todaysFullDate });
            });
          }
          else {
            item.classList.add("different-month");
          }
        }
        /*  If the date is fully booked and the date has passed, remove the
        fully booked class and just add the different-month class that gives the
        box a non-clickable appearence. */
        else {
          item.classList.remove("booked-day");
          item.classList.add("different-month");
        }
      });
  }

  setBookingState = (object) => this.setState(object);

  render = () => {
    // console.log(this.props.bookings.toJS());
    /* Only render if this.state.daysThatAreFull returns true. */
    if (!this.state.stepCompleted) {
      if (this.state.daysThatAreFull) {
        return (
          <React.Fragment>
            <Transition
              from={{right: "-50%", position: "absolute", transform: "translateX(100%)" }}
              enter={{right: "50%", transform: "translateX(50%)" }}
              leave={{ transform: "translateX(-200%)" }}
            >
            { styles =>
              <div className="booking-step container flex vcenter column" style={styles}>
                <h2>2/4 Select time and date</h2>
                <Calendar
                  disableHistory={true}
                  bookings={this.state.daysThatAreFull}
                  clickable={true}
                />
                { this.state.decideWhatTime &&
                    <ChooseTime
                      setBookingState={ this.setBookingState.bind(this) }
                      datesAndTimes={ this.state.datesAndTimes }
                      dateSelected={ this.state.dateSelected }
                      convertDateObjectToString={ this.convertDateObjectToString }
                    />
                }
              </div>
            }
            </Transition>
          </React.Fragment>
        );
      }
    else {
      return null;
    }
  }
    else {
      return (
          <Transition
            from={{right: "-50%", position: "absolute", transform: "translateX(100%)" }}
            enter={{right: "50%", transform: "translateX(50%)" }}
            leave={{ transform: "translateX(-200%)" }}
          >
          { styles =>
              <ContactForm
                setAppState={ this.props.setAppState }
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

export default connect(BookingCalendar, { requestBookings, checkWhichDatesAreFull }, (store) => ({
  bookings: store.bookings
}));
