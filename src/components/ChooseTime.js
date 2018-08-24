import React from 'react';

class ChooseTime extends React.Component {

  handleChange = (e) => {
    this.props.setBookingState({ [e.target.name]: e.target.value, stepCompleted: true });
  }

  render = () => {
    return (
      <div className="time">
        <h2>Select what time to dine</h2>
        <select
          onChange={ this.handleChange.bind(this) }
          name="timeSelected">
            <option value="" selected disabled hidden>Choose here</option>
            <option value="18">18.00</option>
            <option value="21">21.00</option>
        </select>
      </div>
    );
  }
}

export default ChooseTime;
