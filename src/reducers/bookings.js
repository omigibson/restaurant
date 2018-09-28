import {
  FETCH_BOOKINGS_SUCCESS
} from '../constants/actionTypes';
import { List } from 'immutable';

const initialState = List();

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return state.merge(action.payload.bookings);
    default:
      return state;
    }
  }

export default bookings;
