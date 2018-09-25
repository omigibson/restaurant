import {
  FETCH_BOOKINGS_SUCCESS, SAVE_CONTROLLED_DATES
} from '../constants/actionTypes';
import { List } from 'immutable';

const initialState = List();

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return state.merge(action.payload.bookings);
    case SAVE_CONTROLLED_DATES:
      return state.set('datesAndTimes', action.payload.controlledBookings)
    default:
      return state;
    }
  }

export default bookings;
