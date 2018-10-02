import React, { PureComponent } from 'react';

class BookingItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      bookingCopy: this.props.item
    }
  }

  handleOnEdit = () => {
    this.setState((prevState) => ({ editing: !prevState.Editing }));
  }


  handleOnChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState((prevState) => ({
      bookingCopy: prevState.bookingCopy.set(name, value)
    }));
  }

  handleOnSave = () => {
    this.setState(
      () => ({ editing: false }),
      () => this.props.onSave(this.state.bookingCopy.toJS())
    );
  }

  render() {
    const { item } = this.props;
    const timeOption = item.time === '18' ? '21' : '18';

    if ( this.state.editing ) {
      return (
        <tr key={item.get('id')}>
          <td>
            <input
              onChange={this.handleOnChange}
              name="date"
              type="date"
              value={this.state.bookingCopy.get('date', item.get('date'))}
            />
          </td>
          <td>
            <select
              name="time"
              onChange={this.handleOnChange}>
              <option value ={ item.get('time') } >{ item.get('time') }</option>
              <option value={timeOption}>{timeOption}</option>
            </select>
          </td>
          <td>
            <input
              onChange={this.handleOnChange}
              name="guests"
              type="number"
              defaultValue={ this.state.bookingCopy.get('guests', item.get('guests')) }
              min="1"
              max="6"
            />
          </td>
          <td>
            <input
              onChange={this.handleOnChange}
              name="name"
              type="text"
              defaultValue={ this.state.bookingCopy.get('name', item.get('name')) }
            />
          </td>
          <td>
            <input
              onChange={this.handleOnChange}
              name="tel"
              type="tel"
              defaultValue={ this.state.bookingCopy.get('tel', item.get('tel')) }
            />
          </td>
          <td>
            <input
              onChange={this.handleOnChange}
              name="email"
              type="email"
              defaultValue={ this.state.bookingCopy.get('email', item.get('email')) }
            />
          </td>
          <td>
            <button
              onClick={ this.handleOnSave }
              id={ item.get('userID') }
              className="button save lightgreen">{'Save'}
            </button>
          </td>
        </tr>
      )
    }

    return (
      <tr key={item.get('id')}>
        <td>{item.get('date')}</td>
        <td>{ item.get('time') }</td>
        <td>{ item.get('guests') }</td>
        <td>{ item.get('name') }</td>
        <td>{ item.get('tel') }</td>
        <td>{ item.get('email') }</td>
        <td>
          <button
            name={item.get('id')}
            onClick={ this.handleOnEdit }
            id={ item.get('id') }
            className="button edit green">{'Edit booking'}
          </button>
        </td>
        <td>
          <button name={item.get('id')}
            onClick={ this.props.onDelete }
            id={ item.get('id') }
            className="button delete red">{'Remove booking'}
          </button>
        </td>
      </tr>
    );
  }
}

export default BookingItem;
