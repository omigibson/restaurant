import React from 'react';

class BookingItem extends React.Component {
  state = {
    editing: false,
    bookingToEdit: {}
  }

  render(){
    if (this.props.bookingItem) {
      return this.props.bookingItem.map((item, i) => {
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
              <button name={i}
                      onClick={ this.props.onEditClick }
                      id={ item.bookingID }>
                      Edit booking
              </button>
            </td>
            <td>
              <button name={i}
                      onClick={ this.props.onDeleteClick }
                      id={ item.bookingID }>
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
}
export default BookingItem;
