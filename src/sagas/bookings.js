import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_BOOKINGS_REQUEST } from '../constants/actionTypes';

// Action Creators


function* handleFetchOfBookings(action) {
  console.log('What happend? ', action.type);
}

export default function* bookingsSaga() {
  yield takeLatest(FETCH_BOOKINGS_REQUEST, handleFetchOfBookings)
}
