import React from 'react';

class ChooseTime extends React.Component {

  handleChange = (e) => {
    this.props.setBookingState({ [e.target.name]: e.target.value, stepCompleted: true });
  }

  checkIfNoBookingForDateAndTime = (datesAndTimes, dateSelected) => {
    if(!datesAndTimes[dateSelected]) {
      datesAndTimes = { [dateSelected]: { 18: { fullyBooked: false, bookings: [] }, 21: { fullyBooked: false, bookings: [] } } }
      return datesAndTimes[dateSelected];
    }
    return datesAndTimes[dateSelected];
  }

  render = () => {
    const dateSelected = this.props.convertDateObjectToString(this.props.dateSelected);
    const datesAndTimes = this.checkIfNoBookingForDateAndTime(this.props.datesAndTimes, dateSelected);
    return (
    <div className="select-time-container">
        <h2>Select what time to dine</h2>
          { !datesAndTimes['18']['fullyBooked'] ?
              <button
                className='amount-of-button'
                value="18"
                name="timeSelected"
                onClick={ this.handleChange.bind(this) }>18.00
              </button> : ''
          }
          { !datesAndTimes['21']['fullyBooked'] ?
              <button
                className='amount-of-button'
                value="21"
                name="timeSelected"
                onClick={ this.handleChange.bind(this) }>21.00
              </button> : ''
          }
      </div>
    );
  }
}

export default ChooseTime;
