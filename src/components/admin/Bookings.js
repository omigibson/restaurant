import React from "react";
import PropTypes from 'prop-types';
import map from 'lodash.map';

const Bookings = (props) => {

  if ( !props.bookings ) {
    return null;
  }

  // Creates an array of values by running each element in collection thru iteratee.
  // returns an array
  const bookings = map(props.bookings);

  return bookings.map((item, i) => {
    if(props.isEditing && item.id === props.bookingToEdit.id){
      let timeOption = "";
      if (item.time === "18"){
        timeOption = "21";
      }
      else {
        timeOption = "18";
      }
      return <tr key={item.id}>
        <td>
          <input
            onChange={props.handleEdit.bind(this)}
            name="date"
            type="date"
            defaultValue={ item.date }
          />
        </td>
        <td>
          <select
            name="time"
            onChange={props.handleEdit.bind(this)}>
            <option value ={ item.time } >{ item.time }</option>
            <option value={timeOption}>{timeOption}</option>
          </select>
        </td>
        <td>
          <input
            onChange={props.handleEdit.bind(this)}
            name="guests"
            type="number"
            defaultValue={ item.guests }
            min="1"
            max="6"
          />
        </td>
        <td>
          <input
            onChange={props.handleEdit.bind(this)}
            name="name"
            type="text"
            defaultValue={ item.name }
          />
        </td>
        <td>
          <input
            onChange={props.handleEdit.bind(this)}
            name="tel"
            type="tel"
            defaultValue={ item.tel }
          />
        </td>
        <td>
          <input
            onChange={props.handleEdit.bind(this)}
            name="email"
            type="email"
            defaultValue={ item.email }
          />
        </td>
        <td>
          <button name={i}
            onClick={ props.onSave }
            id={ item.id }
            className="button save lightgreen">
                          Save
          </button>
        </td>
      </tr>;
    } else {
      return <tr key={i}>
        <td>{ item.date }</td>
        <td>{ item.time }</td>
        <td>{ item.guests }</td>
        <td>{ item.name }</td>
        <td>{ item.tel }</td>
        <td>{ item.email }</td>
        <td>
          <button
            name={i}
            onClick={ props.onEdit }
            id={ item.id }
            className="button edit green">
                          Edit booking
          </button>
        </td>
        <td>
          <button name={i}
            onClick={ props.onDelete }
            id={ item.id }
            className="button delete red">
                          Remove booking
          </button>
        </td>
      </tr>;
    }
  });
};

export default Bookings;
