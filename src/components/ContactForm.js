import React from 'react';

class ContactForm extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    userTelephone: '',
    stepCompleted: false,
    allBookingDetails: {}
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
  validateInput = () => {
    if (this.state.userName.length >= 5 && this.validateEmail(this.state.userEmail) && this.validatePhone(this.state.userTelephone)) {
      return true;
    }
    return false;
  }

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
        <div className="container">
          <p> Guests: { this.props.bookingDetails.amountOfGuests } </p>
          <p> Date: { this.props.convertDateObjectToString(this.props.bookingDetails.dateSelected) } </p>
          <p> Time: { this.props.bookingDetails.timeSelected } </p>
          <div className="contact-form">
              <h2>Contact details</h2>
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  name="userName"
                  onChange={this.handleChange.bind(this)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="userEmail"
                  onChange={this.handleChange.bind(this)}
                />
                <input
                  type="tel"
                  placeholder="Tel"
                  name="userTelephone"
                  onChange={this.handleChange.bind(this)}
                />
                <button
                  className="contact-form-button"
                  type="button"
                  value="Book"
                  onClick={ () => this.validateInput() && this.sendAllToAPI() }
                >
                Send
                </button>
              </form>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="container">
          <h1>Your reservation was successful.</h1>
          <h2>Details:</h2>
          <p>Name: { this.state.allBookingDetails.userName } </p>
          <p>Date: { this.state.allBookingDetails.date } </p>
          <p>Time: { this.state.allBookingDetails.time } </p>
          <p>Guests: { this.state.allBookingDetails.guests } </p>
        </div>
      );
    }
  }
}
export default ContactForm;
