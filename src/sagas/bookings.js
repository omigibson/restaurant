import { takeLatest, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

//API
import { fetchBookings, sendToAPI } from '../api/bookings';

//Action Types
import { FETCH_BOOKINGS_REQUEST, POST_BOOKING_REQUEST, MAKE_BOOKING_SUCCESS } from '../constants/actionTypes';

// Action Creators
import { receiveBookings, makeBookingSuccess, sendEmailSuccess } from '../actions/bookings';
import { setViewstate } from '../actions/viewstate';

function* handleFetchOfBookings(action) {
  try {
    const response = yield call(fetchBookings,'fetch_bookings.php');
    if (response.error) throw new Error(response.error);
    yield put(receiveBookings(fromJS(response)));
  }  catch (error) {
    console.log('Something went wrong in handleFetchOfBookings!');
  }
}

function* handlePostOfBooking(action) {
  try {
    const userDetailsResponse = yield call(sendToAPI, action.payload.userDetails, 'post_user_details.php');

    const postObject = {...action.payload.bookingDetails, userID: userDetailsResponse.id }
    const bookingDetailsResponse = yield call(sendToAPI, postObject, 'post_booking.php');
    yield put(makeBookingSuccess(fromJS(bookingDetailsResponse)));

    const emailObject = { ...userDetailsResponse, ...bookingDetailsResponse };
    const emailResponse = yield call(sendToAPI, emailObject, 'send_email.php');

    yield put(sendEmailSuccess());
    yield put(setViewstate('bookingCompleted', true));

    if (userDetailsResponse.error) throw new Error(userDetailsResponse.error);
  } catch (error) {
    console.log('Something went wrong in handlePostOfBookings!');
  }
}

export default function* bookingsSaga() {
  yield takeLatest(FETCH_BOOKINGS_REQUEST, handleFetchOfBookings);
  yield takeLatest(POST_BOOKING_REQUEST, handlePostOfBooking);
}
