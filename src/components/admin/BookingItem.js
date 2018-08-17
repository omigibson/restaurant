import React from 'react';

const BookingItem = (props) => {
  console.log(props.BookingItem);

  if (props.BookingItem) {
    return props.BookingItem.map((item, i) => {
      return (
        <tr key={i}>
          <td>{ item.date }</td>
          <td>{ item.time }</td>
          <td>{ item.guests }</td>
          <td>{ item.name }</td>
          <td>{ item.tel }</td>
          <td>{ item.email }</td>
          <td><button>Remove booking</button></td>
        </tr>
      )
    });
  } else {
    console.log("No bookings yet");
    return null;
  }
}
export default BookingItem;
