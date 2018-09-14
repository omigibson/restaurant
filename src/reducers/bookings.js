import {
  FETCH_BOOKINGS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  bookings: {}
}

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return Object.assign({}, state, action.payload.bookings);
    default:
    console.log('yoyoyo');
      return state;
  }
}

export default bookings;
