import React from "react";
import BookingItem from './BookingItem';

const Bookings = (props) => {

  if ( !props.bookings || props.bookings.isEmpty() ) {
    return null;
  }

  return props.bookings.map((item) =>
    <BookingItem
        item={item}
        key={item.get('id')}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
        onSave={props.onSave} />
  )
};

export default Bookings;
