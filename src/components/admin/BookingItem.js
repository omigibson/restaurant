import React from 'react';

class BookingItem extends React.Component {

    render(){
        if (this.props.bookingItems) {
            return this.props.bookingItems.map((item, i) => {
                if(this.props.isEditing && item.id === this.props.bookingToEdit.id){
                    let timeOption = '';
                    if (item.time === '18'){
                        timeOption = '21';
                    }
                    else {
                        timeOption = '18';
                    }
                    return <tr key={i}>
                        <td>
                            <input
                                onChange={this.props.handleEdit.bind(this)}
                                name="date"
                                type="date"
                                defaultValue={ item.date }
                            />
                        </td>
                        <td>
                            <select
                                name="time"
                                onChange={this.props.handleEdit.bind(this)}>
                                <option value ={ item.time } >{ item.time }</option>
                                <option value={timeOption}>{timeOption}</option>
                            </select>
                        </td>
                        <td>
                            <input
                                onChange={this.props.handleEdit.bind(this)}
                                name="guests"
                                type="number"
                                defaultValue={ item.guests }
                                min="1"
                                max="6"
                            />
                        </td>
                        <td>
                            <input
                                onChange={this.props.handleEdit.bind(this)}
                                name="name"
                                type="text"
                                defaultValue={ item.name }
                            />
                        </td>
                        <td>
                            <input
                                onChange={this.props.handleEdit.bind(this)}
                                name="tel"
                                type="tel"
                                defaultValue={ item.tel }
                            />
                        </td>
                        <td>
                            <input
                                onChange={this.props.handleEdit.bind(this)}
                                name="email"
                                type="email"
                                defaultValue={ item.email }
                            />
                        </td>
                        <td>
                            <button name={i}
                                onClick={ this.props.onSave }
                                id={ item.id }>
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
                                onClick={ this.props.onEdit }
                                id={ item.id }>
                            Edit booking
                            </button>
                        </td>
                        <td>
                            <button name={i}
                                onClick={ this.props.onDelete }
                                id={ item.id }>
                            Remove booking
                            </button>
                        </td>
                    </tr>;
                }
            });
        } else {
            console.log('No bookings yet');
            return null;
        }
    }
}
export default BookingItem;
