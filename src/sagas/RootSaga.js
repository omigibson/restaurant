import { all } from 'redux-saga/effects';

// Sagas
import admin from './admin';
import bookings from './bookings';

// Combine all sagas
export default function* Sagas() {
  yield all([
    admin(),
    bookings()
  ]);
}
