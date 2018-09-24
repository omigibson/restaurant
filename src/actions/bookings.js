import { FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCCESS } from '../constants/actionTypes';

export const requestBookings = () => ({
  type: FETCH_BOOKINGS_REQUEST
});

export const receiveBookings = (bookings) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: { bookings }
});
