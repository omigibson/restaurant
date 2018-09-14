import { takeLatest, call, put } from 'redux-saga/effects';

//API
import { fetchBookings } from '../api/bookings'

//Action Types
import { FETCH_BOOKINGS_REQUEST } from '../constants/actionTypes';

// Action Creators
import { receiveBookings } from '../actions/bookings'

function* handleFetchOfBookings(action) {
  console.log('What happend? ', action.type);
  try {
    const response = yield call(fetchBookings,'fetch_bookings_and_customers.php');
    if (response.error) throw new Error(response.error);

    yield put(receiveBookings(response));
  }  catch (error) {
      console.log('Something went wrong!');
  }
}

export default function* bookingsSaga() {
  yield takeLatest(FETCH_BOOKINGS_REQUEST, handleFetchOfBookings)
}
