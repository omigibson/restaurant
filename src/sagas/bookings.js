import { takeLatest, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

//API
import { fetchBookings } from '../api/bookings';

//Action Types
import { FETCH_BOOKINGS_REQUEST } from '../constants/actionTypes';

// Action Creators
import { receiveBookings } from '../actions/bookings';

function* handleFetchOfBookings(action) {
  try {
    const response = yield call(fetchBookings,'fetch_bookings.php');
    if (response.error) throw new Error(response.error);
    yield put(receiveBookings(fromJS(response)));
  }  catch (error) {
    console.log('Something went wrong in handleFetchOfBookings!');
  }
}
