import { FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCCESS, DELETE_BOOKING_REQUEST, DELETE_BOOKING_SUCCESS } from '../constants/actionTypes';


export const requestBookings = () => ({
  type: FETCH_BOOKINGS_REQUEST
});

export const receiveBookings = (bookings) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: { bookings }
});

export const requestDeleteBooking = (id) => ({
  type: DELETE_BOOKING_REQUEST,
  payload: { id }
});

export const deleteBookingSuccess = (id) => ({
  type: DELETE_BOOKING_SUCCESS,
  payload: { id }
});
