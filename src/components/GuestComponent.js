import React from 'react';
import Booking from './Booking';

class GuestComponent extends React.Component {


  state = {
    amountOfGuests: 0,
    stepCompleted: false
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState({ stepCompleted: true });
    });
  }

  amountOfGuestsButtons = (object) => {
    return Object.keys(object).map((key, index) => {
      return (
        <button
          key={index}
          value={key}
          className='amount-of-button'
          name='amountOfGuests'
          onClick={ this.handleChange.bind(this) }
        >
          { key + ' Guests' }
        </button>
      );
    });
  }

  render = () => {
      if (!this.state.stepCompleted) {
        return (
          <div className='container'>
            <h2>Select an amount of guests</h2>
            <div className='amount-of-guests-container'>
              { this.amountOfGuestsButtons({
                  1: '1 Guests',
                  2: '2 Guests',
                  3: '3 Guests',
                  4: '4 Guests',
                  5: '5 Guests',
                  6: '6 Guests'
                })
              }
            </div>
          </div >
        );
      }
    else {
      return (
        <Booking
          amountOfGuests={ this.state.amountOfGuests }
          fetchBookings={ this.props.fetchBookings }
          sendToAPI={ this.props.sendToAPI }
          convertFromStringToDate={ this.props.convertFromStringToDate }
        />
      );
    }
  }
}

export default GuestComponent;
