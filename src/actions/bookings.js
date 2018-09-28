import {
  FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCCESS, UPDATE_BOOKING_STATUS, VIEWSTATE_SET_DATA
} from '../constants/actionTypes';

export const requestBookings = () => ({
  type: FETCH_BOOKINGS_REQUEST
});

export const receiveBookings = (bookings) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: { bookings }
});

export const updateBookingStatus = (step) => ({
  type: UPDATE_BOOKING_STATUS,
  step: { step }
});

export const updateViewstate = (key: string, value: any) => ({
  type: VIEWSTATE_SET_DATA,
  payload: { key, value }
});
