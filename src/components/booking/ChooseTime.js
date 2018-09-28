import React, { Component } from "react";
import { Transition } from "react-spring";

class ChooseTime extends Component {

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  render() {

    return (
      <Transition
        from={{opacity: 0 }}
        enter={{opacity: 1 }}
        leave={{opacity: 0 }}
      >
        { styles =>
          <div className="booking-step select-time-container" style={styles}>
            <h2>Select what time to dine</h2>
            <select onChange={this.handleChange}>
              <option value={'18'}>18</option>
              <option value={'21'}>21</option>
            </select>
          </div>
        }
      </Transition>
    );
  };
}

export default ChooseTime;
