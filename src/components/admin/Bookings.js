import React, { Component } from "react";
import PropTypes from 'prop-types';
import BookingItem from './BookingItem';

const Bookings = (props) => {

  if ( !props.bookings || props.bookings.isEmpty() ) {
    return null;
  }

  return props.bookings.map(item =>
    <BookingItem
        item={item}
        key={item.get('id')}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
        onSave={props.onSave} />
  )

  return props.bookings.map((item, index) => {
    console.log('item', item);
    return (
      <tr key={item.get('id')}>
        <td>{`${item.get('date')}-${item.get('id')}`}</td>
        <td>{ item.get('time') }</td>
        <td>{ item.get('guests') }</td>
        <td>{ item.get('name') }</td>
        <td>{ item.get('tel') }</td>
        <td>{ item.get('email') }</td>
        <td>
          <button
            name={index}
            onClick={ props.onEdit }
            id={ item.get('id') }
            className="button edit green">{'Edit booking'}
          </button>
        </td>
        <td>
          <button name={index}
            onClick={ props.onDelete }
            id={ item.get('id') }
            className="button delete red">{'Remove booking'}
          </button>
        </td>
      </tr>
    )
  }).toArray();

  return props.bookings.map((item, i) => {
    if(props.isEditing && item.id === props.bookingToEdit.id){
      let timeOption = "";
      if (item.time === "18"){
        timeOption = "21";
      }
      else {
        timeOption = "18";
      }
      return <tr key={item.get('id')}>
        <td>
          <input
            onChange={props.handleEdit.bind(this)}
            name="date"
            type="date"
            defaultValue={ item.get('date') }
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
      return <tr key={item.get('id')}>
        <td>{`${item.date}-${item.id}`}</td>
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
