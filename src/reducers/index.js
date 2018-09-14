import { combineReducers } from 'redux'
import bookings from './bookings'
import customers from './customers'

export default combineReducers({
  bookings,
  customers
});
