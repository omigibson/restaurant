import React from 'react';

class ContactForm extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    userTelephone: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  convertDateObjectToString = (dateObject) => {
    const yyyy = dateObject.getFullYear().toString();
    const mm = (dateObject.getMonth() + 101).toString().slice(-2);
    const dd = (dateObject.getDate() + 100).toString().slice(-2);
    return yyyy + '-' + mm + '-' + dd;
  }

  sendAllToAPI = () => {
    /* Sends JSON to send_email.php – a file that sends a confirmation E-Email
    to the user. */
    this.sendToAPI({
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      guests: this.props.bookingDetails.amountOfGuests,
      date: this.convertDateObjectToString(this.props.bookingDetails.dateSelected),
      time: 18
    }, 'send_email.php')
      .then((emailResponse) => console.log(emailResponse))

    /* Sends the user details to the specified file and inserts the JSON into
    MySQL. */
    this.sendToAPI({
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      userTelephone: this.state.userTelephone
  }, 'post_user_details.php')
    .then((userDetailsResponse) => {
      /* A response comes back from the DB with an id that is used when inserting
      a row into the post_booking.php file. This is because we want to separate
      the user and the booking tables. */
      const dateObjectToString = this.convertDateObjectToString(this.props.bookingDetails.dateSelected);
      this.sendToAPI({
        date: dateObjectToString,
        guests: this.props.bookingDetails.amountOfGuests,
        time: 18,
        userID: userDetailsResponse.id
      }, 'post_booking.php')
        .then((bookingDetailsResponse) => console.log(bookingDetailsResponse))
    })
  }

  /* Handles our API-requests. */ 
  sendToAPI = (json, serverFile) => {
    return fetch(`http://localhost:8888/${serverFile}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(json)
    })
      .then((response) => response.json())
  }

  render = () => {
    return (
      <div className="container">
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
                onClick={ () => this.sendAllToAPI() }
              >
              Send
              </button>
            </form>
        </div>
      </div>
    );
  }
}
export default ContactForm;
