import React from 'react';

const BookingItem = (props) => {

  if (props.bookingItem) {
    return props.bookingItem.map((item, i) => {
      return (
        <tr key={i}>
          <td>{ item.bookingID }</td>
          <td>{ item.date }</td>
          <td>{ item.time }</td>
          <td>{ item.guests }</td>
          <td>{ item.name }</td>
          <td>{ item.tel }</td>
          <td>{ item.email }</td>
          <td>
            <button onClick={ props.onClick }
                    id={item.bookingID}>
                    Remove booking
            </button>
          </td>
        </tr>
      )
    });
  } else {
    console.log("No bookings yet");
    return null;
  }
}
export default BookingItem;
