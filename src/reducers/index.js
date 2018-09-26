import { combineReducers } from 'redux';
import admin from './admin';
import bookings from './bookings';
import viewstate from './viewstate';

export default combineReducers({
  admin,
  bookings,
  viewstate
});
