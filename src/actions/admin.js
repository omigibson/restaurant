import { FETCH_ADMIN_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCCESS, DELETE_BOOKING_REQUEST, DELETE_BOOKING_SUCCESS,
SAVE_BOOKING_REQUEST, SAVE_BOOKING_SUCCESS } from '../constants/actionTypes';


export const requestAdminBookings = () => ({
  type: FETCH_ADMIN_BOOKINGS_REQUEST
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

export const saveBookingRequest = (booking) => ({
  type: SAVE_BOOKING_REQUEST,
  payload: { booking }
});

export const saveBookingSuccess = (booking) => ({
  type: SAVE_BOOKING_SUCCESS,
  payload: { booking }
});
