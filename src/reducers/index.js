import { combineReducers } from 'redux'
import admin from './admin'
import bookings from './bookings'

export default combineReducers({
  admin,
  bookings
});
