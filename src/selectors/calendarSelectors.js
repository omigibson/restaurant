import { createSelector } from 'reselect';
import { List, fromJS } from 'immutable';

// Get bookings from store
const getAllBookings = store => store.bookings;


export const getControlledBookings = createSelector(getAllBookings, bookings => {
  return bookings
});

export const getBookingsPerDateAndTime = createSelector(getAllBookings, bookings => {
  return bookings
});

export const getBookedDates = createSelector(getAllBookings, bookings => {

  // If there are no bookings return an empty list
  if ( !bookings || bookings.isEmpty() ) {
    return List();
  }

  // Get the number of bookings per date and per time
  const numberOfBookingsPerDateAndTime = bookings
    .groupBy(booking => booking.get('date'))
    .map((groupedBookings, index) => {
      const bookingsAt18 = groupedBookings.filter(booking => booking.get('time') === '18')
      const bookingsAt21 = groupedBookings.filter(booking => booking.get('time') === '21')
      return fromJS({
        '18': bookingsAt18.count(),
        '21': bookingsAt21.count()
      })
    });

  // console.log('numberOfBookingsPerDateAndTime', numberOfBookingsPerDateAndTime);

  const fullyBookedDates = numberOfBookingsPerDateAndTime.map((bookings, date) => {
    if ( bookings.get('18', 0) >= 8 && bookings.get('21', 0) >= 8 ) {
      return date;
    }
    return null;
  });

  // console.log('fullyBookedDates', fullyBookedDates);

  return fullyBookedDates;
});
