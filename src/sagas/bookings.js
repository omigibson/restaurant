import { takeLatest, call, put } from 'redux-saga/effects';
import { fromJS, List, Map } from 'immutable';

//API
import { fetchBookings } from '../api/bookings';

//Action Types
import { FETCH_BOOKINGS_REQUEST, CHECK_WHICH_DATES_ARE_FULL } from '../constants/actionTypes';

// Action Creators
import { receiveBookings, checkWhichDatesAreFull, saveControlledDates } from '../actions/bookings';

function* handleFetchOfBookings(action) {
  try {
    const response = yield call(fetchBookings,'fetch_bookings.php');
    if (response.error) throw new Error(response.error);
    yield put(receiveBookings(fromJS(response)));
    // yield put(checkWhichDatesAreFull(response));
  }  catch (error) {
    console.log('Something went wrong in handleFetchOfBookings!');
  }
}

// function* handleCheckingWhichDatesAreFull(action) {
//   console.log('Yoyoyo');
//
//   const bookingsPerDateAndTime = sortBookingsPerDate();
//
//   function sortBookingsPerDate() {
//     const allBookings = action.payload;
//     /* Empty object that will contain all dates with bookings. */
//     let bookingsPerDateAndTime = {};
//     for (let i = 0; i < allBookings.length; i++) {
//       /* If the date doesn"t already exist, create it (object) and add both "18" and "21" (arrays). */
//       if (!bookingsPerDateAndTime[allBookings[i].date]) {
//         bookingsPerDateAndTime[allBookings[i].date] = { "18": [], "21": [] };
//       }
//       /* Make a copy of the array */
//       const oldArray = bookingsPerDateAndTime[allBookings[i].date][allBookings[i].time];
//       /* Add the new value into the array */
//       bookingsPerDateAndTime[allBookings[i].date][allBookings[i].time] = [...oldArray, allBookings[i].date];
//     }
//     return bookingsPerDateAndTime;
//   }
//
//   console.log(bookingsPerDateAndTime);
//
//   const controlledBookings = (bookingsPerDateAndTime) => {
//     for (let key in bookingsPerDateAndTime) {
//       /* Constructs a new Date where the clock stands at 02:00. */
//       const dateOfBooking = new Date(key);
//       /* We add 16 and 19 to those numbers (the time for the sittings 18:00 and 21:00) */
//       const firstSitting = dateOfBooking.setHours(dateOfBooking.getHours() + 16);
//       const secondSitting = dateOfBooking.setHours(dateOfBooking.getHours() + 19);
//       /* Control if the time for the sitting at 18:00 has passed. */
//       if (firstSitting < Date.now()) {
//           bookingsPerDateAndTime[key]["18"] = { notBookable: true, bookings: bookingsPerDateAndTime[key]["18"] }
//       }
//       else if (bookingsPerDateAndTime[key]["18"].length >= 15) {
//         bookingsPerDateAndTime[key]["18"] = { notBookable: true, bookings: bookingsPerDateAndTime[key]["18"] }
//       }
//       else {
//         bookingsPerDateAndTime[key]["18"] = { notBookable: false, bookings: bookingsPerDateAndTime[key]["18"] }
//       }
//       /* Control if the time for the sitting at 21:00 has passed. */
//       if (secondSitting < Date.now()) {
//           bookingsPerDateAndTime[key]["21"] = { notBookable: true, bookings: bookingsPerDateAndTime[key]["21"] }
//       }
//       else if (bookingsPerDateAndTime[key]["21"].length >= 15) {
//         bookingsPerDateAndTime[key]["21"] = { notBookable: true, bookings: bookingsPerDateAndTime[key]["21"] }
//       }
//       else {
//         bookingsPerDateAndTime[key]["21"] = { notBookable: false, bookings: bookingsPerDateAndTime[key]["21"] }
//       }
//     }
//     return bookingsPerDateAndTime;
//   }
//   yield put(saveControlledDates(List.of(controlledBookings)));
// }

export default function* bookingsSaga() {
  yield takeLatest(FETCH_BOOKINGS_REQUEST, handleFetchOfBookings);
  // yield takeLatest(CHECK_WHICH_DATES_ARE_FULL, handleCheckingWhichDatesAreFull);
}
