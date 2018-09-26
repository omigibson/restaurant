import {
  FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCCESS, CHECK_WHICH_DATES_ARE_FULL,
  SAVE_CONTROLLED_DATES, UPDATE_BOOKING_STATUS, VIEWSTATE_SET_DATA
} from '../constants/actionTypes';

export const requestBookings = () => ({
  type: FETCH_BOOKINGS_REQUEST
});

export const receiveBookings = (bookings) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: { bookings }
});

export const checkWhichDatesAreFull = (bookings) => ({
  type: CHECK_WHICH_DATES_ARE_FULL,
  payload: { bookings }
});

export const saveControlledDates = (controlledBookings) => ({
  type: SAVE_CONTROLLED_DATES,
  payload: { controlledBookings }
});

export const updateBookingStatus = (step) => ({
  type: UPDATE_BOOKING_STATUS,
  step: { step }
});

export const updateViewstate = (selectedGuests) => ({
  type: VIEWSTATE_SET_DATA,
  payload: { selectedGuests }
});
