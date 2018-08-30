import React from 'react';
import { Transition } from 'react-spring';

class ContactForm extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    userTelephone: '',
    consent: false,
    stepCompleted: false,
    allBookingDetails: {},
    emailStyle: '',
    phoneStyle: '',
    usernameStyle: '',
    nameErrorMessage: 'hidden',
    emailErrorMessage: 'hidden',
    phoneErrorMessage: 'hidden',
    checkboxErrorMessage: 'hidden'
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  /* Uses an advanced RegEx (from StackOverflow) that controls if email is correct.
  Returns true or false. */
  validateEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(email).toLowerCase());
  }

  /* Controls if the phone number consists of digits and if its length is more than six. */
  validatePhone = (number) => !isNaN(number) && number.length >= 6;

  /* Controls if the input fields are valid. */
  giveFeedbackToUser = () => {
    this.setState({
      emailStyle: this.validateEmail(this.state.userEmail) ? 'valid-input' : 'invalid-input',
      phoneStyle: this.validatePhone(this.state.userTelephone) ? 'valid-input' : 'invalid-input',
      usernameStyle: this.state.userName.length >= 5 ? 'valid-input' : 'invalid-input',
      nameErrorMessage: this.state.userName.length >= 5 ? 'hidden' : '',
      emailErrorMessage: this.validateEmail(this.state.userEmail) ? 'hidden' : '',
      phoneErrorMessage: this.validatePhone(this.state.userTelephone) ? 'hidden' : '',
      checkboxErrorMessage: this.state.consent ? 'hidden' : ''
    });
  }

  areAllInputsValid = () => this.validateEmail(this.state.userEmail) && this.state.userName.length >= 5 && this.validatePhone(this.state.userTelephone) && this.state.consent;

  /* A hash is generated for all bookings and customers. This is because we want
  a way for the user to delete a reservation without using auto-incremented IDs
  that in this case are pretty unsafe since you can cancel a reservation by using
  http://host/cancel?id={hash}. By generating a unique hash we prevent users from
  cancelling other peoples reservations. The URL is sent to the user in the
  confirmation E-mail. So by using this method, only the user will have access to the
  unique ID(hash). */
  generateHash = () => Math.random().toString(36).substr(2);

  /* Handles all the requests to our API. */
  sendAllToAPI = () => {
    /* A unique hash is generated */
    const hash = this.generateHash();
    /* Sends the user details to the specified file and inserts the JSON into
    MySQL. */
    this.props.sendToAPI({
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      userTelephone: this.state.userTelephone,
      hash: hash
  }, 'post_user_details.php')
    .then((userDetailsResponse) => {
      /* A response comes back from the DB with an id that is used when inserting
      a row into the post_booking.php file. This is because we want to separate
      the user and the booking tables. */
      const dateObjectToString = this.props.convertDateObjectToString(this.props.bookingDetails.dateSelected);
      this.props.sendToAPI({
        date: dateObjectToString,
        guests: this.props.bookingDetails.amountOfGuests,
        time: this.props.bookingDetails.timeSelected,
        userID: userDetailsResponse.id,
        hash: hash
      }, 'post_booking.php')
        .then((bookingDetailsResponse) => {
          /* Sends JSON to send_email.php – a file that sends a confirmation E-Email
          to the user. */
          this.props.sendToAPI({
            userName: this.state.userName,
            userEmail: this.state.userEmail,
            userTelephone: this.state.userTelephone,
            guests: this.props.bookingDetails.amountOfGuests,
            date: this.props.convertDateObjectToString(this.props.bookingDetails.dateSelected),
            time: this.props.bookingDetails.timeSelected,
            hash: hash
          }, 'send_email.php')
            .then((emailResponse) => {
              console.log(emailResponse);
              this.setState({ allBookingDetails: emailResponse, stepCompleted: true });
            })
        });
    })
  }

  render = () => {
    if (!this.state.stepCompleted) {
    return (
      <Transition
        from={{right: '-50%', position: 'absolute', transform: 'translateX(100%)' }}
        enter={{right: '50%', transform: 'translateX(50%)' }}
        leave={{ transform: 'translateX(-200%)' }}
      >
      { styles =>
        <div className="container" style={styles}>
            <div className="contact-form">
              <div className="booking-details">
                <ul>
                  <li> Guests: { this.props.bookingDetails.amountOfGuests } </li>
                  <li> Date: { this.props.convertDateObjectToString(this.props.bookingDetails.dateSelected) } </li>
                  <li> Time: { this.props.bookingDetails.timeSelected } </li>
                </ul>
              </div>
              <h2>Contact details</h2>
              <form>
                <label htmlFor="userName">Name</label>
                <span className={ this.state.nameErrorMessage }>This input field is not filled out correctly</span>
                <input
                  type="text"
                  placeholder="Name"
                  name="userName"
                  onChange={this.handleChange.bind(this)}
                  className={ this.state.usernameStyle }
                />
              <label htmlFor="userEmail">E-mail</label>
                <span className={ this.state.emailErrorMessage }>This input field is not filled out correctly</span>
                <input
                  type="email"
                  placeholder="E-mail"
                  name="userEmail"
                  onChange={this.handleChange.bind(this)}
                  className={ this.state.emailStyle }
                />
                <label htmlFor="userTelephone">Phone number</label>
                <span className={ this.state.phoneErrorMessage }>This input field is not filled out correctly</span>
                <input
                  type="tel"
                  placeholder="Telephone"
                  name="userTelephone"
                  onChange={this.handleChange.bind(this)}
                  className={ this.state.phoneStyle }
                />
              <span className={ this.state.checkboxErrorMessage }>You need to check the box in order to make a booking</span>
                <div className="consent-container">
                  <input
                    type="checkbox"
                    onChange={() => this.setState({ consent: !this.state.consent })}
                  />
                  <label htmlFor="consent">
                    I give Nano Food consent to store and manage the information
                    I left here, in order to enable table reservation.
                  </label>
                </div>
                <div className='flex-column'>
                  <span className='gdpr-info'>
                    Nano Food follows the EU regulation General Data Protection Regulation (GDPR).
                    Read more <a href="https://www.datainspektionen.se/other-lang/in-english/the-general-data-protection-regulation-gdpr2/">here</a>.
                    Your data will be removed when the date for your booking has passed.</span>
                  <button
                    className="contact-form-button"
                    type="button"
                    value="Book"
                    onClick={ () => this.areAllInputsValid() ? this.sendAllToAPI() : this.giveFeedbackToUser() }
                  >
                  Send
                  </button>
                </div>
              </form>
            </div>
      </div> }
    </Transition>
      );
    }
    else {
      return (
        <Transition
          from={{right: '-50%', position: 'absolute', transform: 'translateX(100%)' }}
          enter={{right: '50%', transform: 'translateX(50%)' }}
          leave={{ transform: 'translateX(-200%)' }}
        >
        { styles =>
          <div className="container">
            <div className="booking-details-container" style={styles}>
              <h1>Your reservation was successful.</h1>
              <h2>Details:</h2>
              <p>Name: { this.state.allBookingDetails.userName } </p>
              <p>Date: { this.state.allBookingDetails.date } </p>
              <p>Time: { this.state.allBookingDetails.time } </p>
              <p>Guests: { this.state.allBookingDetails.guests } </p>
            </div>
          </div>
        }
      </Transition>
      );
    }
  }
}
export default ContactForm;
