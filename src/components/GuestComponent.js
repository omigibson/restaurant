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

  render = () => {
      if (!this.state.stepCompleted) {
        return (
          <div className="guest">
              <h2>Select Number Guests</h2>
              <select
                onChange={ this.handleChange.bind(this) }
                name="amountOfGuests"
                defaultValue='Choose here'>
                  <option value="1">1 Guests</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
              </select>
          </div>
        );
      }
    else {
      return (
        <Booking
          amountOfGuests={ this.state.amountOfGuests }
          sendToAPI={ this.props.sendToAPI }
        />
      );
    }
  }
}

export default GuestComponent;
