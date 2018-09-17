import { takeLatest, call, put } from 'redux-saga/effects';

//API
import { fetchBookings } from '../api/bookings';
import { sendToAPI } from '../api/bookings';

//Action Types
import { FETCH_BOOKINGS_REQUEST, DELETE_BOOKING_REQUEST } from '../constants/actionTypes';

// Action Creators
import { requestBookings, receiveBookings, deleteBookingDone } from '../actions/bookings';

function* handleFetchOfBookings(action) {
  try {
    const response = yield call(fetchBookings,'fetch_bookings_and_customers.php');
    if (response.error) throw new Error(response.error);
    yield put(receiveBookings(response));
  }  catch (error) {
    console.log('Something went wrong in handleFetchOfBookings!');
  }
}

  function* handleDeletetionOfBooking(action) {
    const itemToDelete = {
      itemToDelete: action.payload
    };
    try {
      const response = yield call(sendToAPI, [itemToDelete, 'delete_bookings.php']);
      if (response.error) throw new Error(response.error);
      yield put(requestBookings());
    }  catch (error) {
      console.log('Something went wrong in handleDeleteOfBooking!');
    }
  }

export default function* bookingsSaga() {
  yield takeLatest(FETCH_BOOKINGS_REQUEST, handleFetchOfBookings);
  yield takeLatest(DELETE_BOOKING_REQUEST, handleDeletetionOfBooking);
}
