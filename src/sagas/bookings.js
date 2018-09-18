import { takeLatest, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

//API
import { fetchBookings } from '../api/bookings';
import { sendToAPI } from '../api/bookings';

//Action Types
import { FETCH_BOOKINGS_REQUEST, DELETE_BOOKING_REQUEST, SAVE_BOOKING_REQUEST } from '../constants/actionTypes';

// Action Creators
import { receiveBookings, deleteBookingSuccess, saveBookingSuccess } from '../actions/bookings';

function* handleFetchOfBookings(action) {
  try {
    const response = yield call(fetchBookings,'fetch_bookings_and_customers.php');
    if (response.error) throw new Error(response.error);
    yield put(receiveBookings(fromJS(response)));
  }  catch (error) {
    console.log('Something went wrong in handleFetchOfBookings!');
  }
}

  function* handleDeletionOfBooking(action) {
    try {
      const response = yield call(sendToAPI, { id: action.payload.id }, 'delete_bookings.php');
      if (response.error) throw new Error(response.error);
      yield put(deleteBookingSuccess(action.payload.id));
    }  catch (error) {
      console.log('Something went wrong in handleDeleteOfBooking! ' + error);
    }
  }

  function* handleSavingOfBooking(action) {
    try {
      console.log(action.payload.booking);
      const response = yield call(sendToAPI, action.payload.booking, 'update_booking.php');
      if (response.error) throw new Error(response.error);
      console.log(response);
      yield put(saveBookingSuccess(action.payload.booking));
    }  catch (error) {
      console.log('Something went wrong in handleSavingOfBooking! ' + error);
    }
  }

export default function* bookingsSaga() {
  yield takeLatest(FETCH_BOOKINGS_REQUEST, handleFetchOfBookings);
  yield takeLatest(DELETE_BOOKING_REQUEST, handleDeletionOfBooking);
  yield takeLatest(SAVE_BOOKING_REQUEST, handleSavingOfBooking)
}
