import {
  FETCH_BOOKINGS_SUCCESS, DELETE_BOOKING_SUCCESS
} from '../constants/actionTypes';
import { List } from 'immutable';

const initialState = List();

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return state.merge(action.payload.bookings);
    case DELETE_BOOKING_SUCCESS: {
      const index = state.findIndex(item => item.get('id') === action.payload.id)
      return state.delete(index);
    }
    default:
      return state;
  }
}

export default bookings;
