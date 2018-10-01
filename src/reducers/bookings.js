import {
  FETCH_BOOKINGS_SUCCESS, POST_BOOKING_SUCCESS, SEND_EMAIL_SUCCESS
} from '../constants/actionTypes';
import { List } from 'immutable';

const initialState = List();

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return state.merge(action.payload.bookings);
    case POST_BOOKING_SUCCESS:
      return state.push(action.payload.bookingDetails);
    default:
      return state;
    }
  }

export default bookings;
