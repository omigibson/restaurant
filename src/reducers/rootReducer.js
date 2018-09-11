import {
  FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAILURE
} from '../constants/actionTypes';

const initialState = {
  allBookings: null,
  convertedBookings: [],
  editing: false,
  bookingToEdit: {},
  updatedBooking: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
  }
}

export default rootReducer;
