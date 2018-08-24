import React from 'react';

class BookingItem extends React.Component {
  state = {
    editing: false,
    bookingToEdit: {}
  }

  editBooking = (e) => {
    this.setState({
      editing: true,
      bookingToEdit: this.props.bookingItems[e.target.name]
    });
    console.log('This item will be edited!', this.props.bookingItems[e.target.name]);
  }

  render(){
    if (this.props.bookingItems) {
        return this.props.bookingItems.map((item, i) => {
          if(this.state.bookingToEdit && item.bookingID === this.state.bookingToEdit.bookingID){
            return <tr key={i}>
                  <td><input type="text" defaultValue={ item.bookingID } /></td>
                  <td><input type="date" defaultValue={ item.date } /></td>
                  <td><input type="time" defaultValue={ item.time } /></td>
                  <td><input type="number" defaultValue={ item.guests } min="1" max="6" /></td>
                  <td><input type="text" defaultValue={ item.name } /></td>
                  <td><input type="tel" defaultValue={ item.tel } /></td>
                  <td><input type="email" defaultValue={ item.email } /></td>
                </tr>
            } else {
               return <tr key={i}>
                  <td>{ item.bookingID }</td>
                  <td>{ item.date }</td>
                  <td>{ item.time }</td>
                  <td>{ item.guests }</td>
                  <td>{ item.name }</td>
                  <td>{ item.tel }</td>
                  <td>{ item.email }</td>
                  <td>
                    <button name={i}
                            onClick={ this.editBooking }
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
            }
          })

        // else {
        //     return(
        //       <form>
        //         <tr key={i}>
        //           <td><input type="text" value={ item.bookingID } /></td>
        //           <td><input type="date" value={ item.date } /></td>
        //           <td><input type="time" value={ item.time } /></td>
        //           <td><input type="number" value={ item.guests } min="1" max="6" /></td>
        //           <td><input type="text" value={ item.name } /></td>
        //           <td><input type="tel" value={ item.tel } /></td>
        //           <td><input type="email" value={ item.email } /></td>
        //           // <td>
        //           //   <button name={i}
        //           //           onClick={ this.props.onEditClick }
        //           //           id={ item.bookingID }>
        //           //           Save
        //           //   </button>
        //           // </td>
        //         </tr>
        //       </form>
        //   )
        // }
      } else {
        console.log("No bookings yet");
        return null;
      }
  }
}
export default BookingItem;
