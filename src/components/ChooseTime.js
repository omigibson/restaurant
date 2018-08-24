import React from 'react';

class ChooseTime extends React.Component {

  handleChange = (e) => {
    this.props.setBookingState({ [e.target.name]: e.target.value, stepCompleted: true });
  }

  convertDateObjectToString = (dateObject) => {
    const yyyy = dateObject.getFullYear().toString();
    const mm = (dateObject.getMonth() + 101).toString().slice(-2);
    const dd = (dateObject.getDate() + 100).toString().slice(-2);
    return yyyy + '-' + mm + '-' + dd;
  }

  checkIfNoBookingForDateAndTime = (datesAndTimes, dateSelected) => {
    if(!datesAndTimes[dateSelected]) {
      datesAndTimes = { [dateSelected]: { 18: { fullyBooked: false, bookings: [] }, 21: { fullyBooked: false, bookings: [] } } }
      return datesAndTimes[dateSelected];
    }
    return datesAndTimes[dateSelected];
  }

  render = () => {
    const dateSelected = this.convertDateObjectToString(this.props.dateSelected);
    const datesAndTimes = this.checkIfNoBookingForDateAndTime(this.props.datesAndTimes, dateSelected);
    return (
      <div className="time">
        <h2>Select what time to dine</h2>
        <select
          onChange={ this.handleChange.bind(this) }
          name="timeSelected">
            <option value="" selected disabled hidden>Choose here</option>
            { !datesAndTimes['18']['fullyBooked'] ? <option value="18">18.00</option> : '' }
            { !datesAndTimes['21']['fullyBooked'] ? <option value="21">21.00</option> : '' }
        </select>
      </div>
    );
  }
}

export default ChooseTime;
