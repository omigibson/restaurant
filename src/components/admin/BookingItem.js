import React from 'react';

const BookingItem = (props) => {
  console.log(props.BookingItem);

  if (props.BookingItem) {
    return props.BookingItem.map((item, i) => {
      return (<li key={i}>{ item.date }</li>)
    });
  } else {
    console.log("No bookings yet");
    return null;
  }
}
export default BookingItem;
