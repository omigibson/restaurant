import React from 'react';
import BookingCalendar from 'react-booking-calendar';

const Booking = (props) => {
  let bookings = [];
  if (props.bookings) {
    console.log(props.bookings);
    props.bookings.forEach((booking) => {
      bookings.push(new Date(booking.date));
    });
  }
  return(
    <BookingCalendar bookings={bookings} clickable={true} />
  );
}

export default Booking;
