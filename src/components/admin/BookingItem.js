import React from 'react';

const BookingItem = (props) => {
  console.log(props.BookingItem);

  if (props.BookingItem) {
    return props.BookingItem.map((item, i) => {
      return (
        <tr key={i}>
          <td>{ item.date }</td>
          <td>{ item.time }</td>
          <td>{ item.userID }</td>
          <td>{ item.userID }</td>
          <td>{ item.userID }</td>
          <button>Remove booking</button>
        </tr>
      )
    });
  } else {
    console.log("No bookings yet");
    return null;
  }
}
export default BookingItem;
