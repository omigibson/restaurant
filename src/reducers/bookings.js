import {
  FETCH_BOOKINGS_SUCCESS, DELETE_BOOKING_SUCCESS
} from '../constants/actionTypes';

const initialState = []

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return Object.assign([], state, action.payload.bookings);
    // case DELETE_BOOKING_SUCCESS:
    //   let updatedBookingArray = store.getState();
    // return
    // updatedBookingArray.splice(e.target.name, 1);
    // this.setState({ allBookings: updatedBookingArray });
    default:
      return state;
  }
}

export default bookings;
