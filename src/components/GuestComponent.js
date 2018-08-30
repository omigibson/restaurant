import React from 'react';
import Booking from './Booking';
import { Transition } from 'react-spring';

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
          <Transition
            from={{right: '-50%', position: 'absolute', transform: 'translateX(100%)' }}
            enter={{right: '50%', transform: 'translateX(50%)' }}
            leave={{ transform: 'translateX(-200%)' }}
          >
            {styles => <div className='container flex vcenter hcenter' style={styles}>
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
            </div> }
          </Transition>
        );
      }
    else {
      return (
        <Transition
          from={{right: '-50%', position: 'absolute', transform: 'translateX(100%)' }}
          enter={{right: '50%', transform: 'translateX(50%)' }}
          leave={{ transform: 'translateX(-200%)' }}
        >
        { styles =>
          <Booking
            style={ styles }
            amountOfGuests={ this.state.amountOfGuests }
            fetchBookings={ this.props.fetchBookings }
            sendToAPI={ this.props.sendToAPI }
            convertFromStringToDate={ this.props.convertFromStringToDate }
          />
        }
      </Transition>
      );
    }
  }
}

export default GuestComponent;
