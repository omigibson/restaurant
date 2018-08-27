import React from 'react';

class BookingItem extends React.Component {
  state = {
    bookingToEdit: {},
    updatedBooking: {}
  }

  handleEdit = (e) => {
    let updatedBooking = Object.assign({}, this.state.bookingToEdit, {
      [e.target.name]: e.target.value
    });
    this.setState({ updatedBooking });
  }


  editBooking = (e) => {
    this.setState({
      bookingToEdit: this.props.bookingItems[e.target.name]
    });
    console.log('This item will be edited!', this.props.bookingItems[e.target.name]);
  }

  saveUpdatedBooking = () => {
    //skicka in updatedBooking i DB
    this.props.updateDB(this.state.updatedBooking, "update_booking.php");
    //this.setState({ updatedBooking: {}, bookingToEdit: {} });
    console.log('This is our updated booking object:', this.state.updatedBooking);
  }


  render(){
    if (this.props.bookingItems) {
        return this.props.bookingItems.map((item, i) => {
          if(this.state.bookingToEdit && item.id === this.state.bookingToEdit.id){
            return <tr key={i}>
                  <td>
                    <input
                      onChange={this.handleEdit.bind(this)}
                      name="date"
                      type="date"
                      defaultValue={ item.date }
                    />
                  </td>
                  <td>
                    <input
                      onChange={this.handleEdit.bind(this)}
                      name="time"
                      type="text"
                      defaultValue={ item.time }
                    />
                  </td>
                  <td>
                    <input
                      onChange={this.handleEdit.bind(this)}
                      name="guests"
                      type="number"
                      defaultValue={ item.guests }
                      min="1"
                      max="6"
                    />
                  </td>
                  <td>
                    <input
                      onChange={this.handleEdit.bind(this)}
                      name="name"
                      type="text"
                      defaultValue={ item.name }
                    />
                  </td>
                  <td>
                    <input
                      onChange={this.handleEdit.bind(this)}
                      name="tel"
                      type="tel"
                      defaultValue={ item.tel }
                    />
                  </td>
                  <td>
                    <input
                      onChange={this.handleEdit.bind(this)}
                      name="email"
                      type="email"
                      defaultValue={ item.email }
                    />
                  </td>
                  <td>
                    <button name={i}
                            onClick={ this.saveUpdatedBooking }
                            id={ item.id }>
                            Save
                    </button>
                  </td>
                </tr>
            } else {
               return <tr key={i}>
                  <td>{ item.id }</td>
                  <td>{ item.userID }</td>
                  <td>{ item.date }</td>
                  <td>{ item.time }</td>
                  <td>{ item.guests }</td>
                  <td>{ item.name }</td>
                  <td>{ item.tel }</td>
                  <td>{ item.email }</td>
                  <td>
                    <button
                            name={i}
                            onClick={ this.editBooking }
                            id={ item.id }>
                            Edit booking
                    </button>
                  </td>
                  <td>
                    <button name={i}
                            onClick={ this.props.onDeleteClick }
                            id={ item.id }>
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
        //           <td><input type="text" value={ item.id } /></td>
        //           <td><input type="date" value={ item.date } /></td>
        //           <td><input type="time" value={ item.time } /></td>
        //           <td><input type="number" value={ item.guests } min="1" max="6" /></td>
        //           <td><input type="text" value={ item.name } /></td>
        //           <td><input type="tel" value={ item.tel } /></td>
        //           <td><input type="email" value={ item.email } /></td>
        //           // <td>
        //           //   <button name={i}
        //           //           onClick={ this.props.onEditClick }
        //           //           id={ item.id }>
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
