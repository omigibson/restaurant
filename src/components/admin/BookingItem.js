import React, { PureComponent } from 'react';

class BookingItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      editing: false,
    }
  }

  handleOnEdit = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing
    }));
  }

  handleOnSave = () => {}

  render() {

    const { item } = this.props;

    const timeOption = item.time === '18' ? '21' : '18';


    if ( this.state.editing ) {
      return (
        <tr key={item.get('id')}>
          <td>
            <input
              onChange={() => {}}
              name="date"
              type="date"
              defaultValue={ item.get('date') }
            />
          </td>
          <td>
            <select
              name="time"
              onChange={() => {}}>
              <option value ={ item.get('time') } >{ item.get('time') }</option>
              <option value={timeOption}>{timeOption}</option>
            </select>
          </td>
          <td>
            <input
              onChange={() => {}}
              name="guests"
              type="number"
              defaultValue={ item.get('guests') }
              min="1"
              max="6"
            />
          </td>
          <td>
            <input
              onChange={() => {}}
              name="name"
              type="text"
              defaultValue={ item.get('name') }
            />
          </td>
          <td>
            <input
              onChange={() => {}}
              name="tel"
              type="tel"
              defaultValue={ item.get('tel') }
            />
          </td>
          <td>
            <input
              onChange={() => {}}
              name="email"
              type="email"
              defaultValue={ item.get('email') }
            />
          </td>
          <td>
            <button
              onClick={ this.handleOnSave }
              id={ item.get('id') }
              className="button save lightgreen">{'Save'}
            </button>
          </td>
        </tr>
      )
    }

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
    )
  }

}

export default BookingItem;
