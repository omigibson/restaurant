import { createSelector } from 'reselect';
import { List } from 'immutable';

const getAllBookings = state => state.bookings;

export const getBookingsPerDateAndTime = createSelector(getAllBookings, bookings => {
  if (!bookings || bookings.isEmpty()) {
    return List();
  }
  let bookingsPerDateAndTime = {};
  for (let i = 0; i < bookings.length; i++) {
    /* If the date doesn"t already exist, create it (object) and add both "18" and "21" (arrays). */
    if (!bookingsPerDateAndTime[bookings[i].date]) {
      bookingsPerDateAndTime[bookings[i].date] = { "18": [], "21": [] };
    }
    /* Make a copy of the array */
    const oldArray = bookingsPerDateAndTime[bookings[i].date][bookings[i].time];
    /* Add the new value into the array */
    bookingsPerDateAndTime[bookings[i].date][bookings[i].time] = [...oldArray, bookings[i].date];
  }
  return bookingsPerDateAndTime;
});

console.log(getBookingsPerDateAndTime);

export const getControlledBookings = createSelector(getBookingsPerDateAndTime, object => {
  console.log(object);
  for (let key in object) {
    /* Constructs a new Date where the clock stands at 02:00. */
    const dateOfBooking = new Date(key);
    /* We add 16 and 19 to those numbers (the time for the sittings 18:00 and 21:00) */
    const firstSitting = dateOfBooking.setHours(dateOfBooking.getHours() + 16);
    const secondSitting = dateOfBooking.setHours(dateOfBooking.getHours() + 19);
    /* Control if the time for the sitting at 18:00 has passed. */
    if (firstSitting < Date.now()) {
        object[key]["18"] = { notBookable: true, bookings: object[key]["18"] }
    }
    else if (object[key]["18"].length >= 3) {
      object[key]["18"] = { notBookable: true, bookings: object[key]["18"] }
    }
    else {
      object[key]["18"] = { notBookable: false, bookings: object[key]["18"] }
    }
    /* Control if the time for the sitting at 21:00 has passed. */
    if (secondSitting < Date.now()) {
        object[key]["21"] = { notBookable: true, bookings: object[key]["21"] }
    }
    else if (object[key]["21"].length >= 3) {
      object[key]["21"] = { notBookable: true, bookings: object[key]["21"] }
    }
    else {
      object[key]["21"] = { notBookable: false, bookings: object[key]["21"] }
    }
  }
  return object;
});

console.log(getControlledBookings);

export const getDaysThatAreFull = createSelector(getControlledBookings, object => {
  let datesThatArenotBookable = [];
  for (let key in object) {
    if(object[key]["21"].notBookable && object[key]["18"].notBookable) {
      datesThatArenotBookable.push(key);
      continue;
    }
  }
})
