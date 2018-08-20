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

    postToAPI = (json, serverFile) => {
      return fetch(`http://localhost:8888/${serverFile}`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(json)
      })
        .then((response) => response.json())
    }

    render = () => {
      console.log(this.state);
      return (
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
                  type="button"
                  value="Book"
                  onClick={ () => this.postToAPI({
                    userName: this.state.userName,
                    userEmail: this.state.userEmail,
                    userTelephone: this.state.userTelephone
                  }, 'post_user_details.php')
                    .then((userDetailsResponse) => {
                      const dateObjectToString = this.props.bookingDetails.dateSelected.toISOString().slice(0,10);
                      this.postToAPI({
                        date: dateObjectToString,
                        guests: 5,
                        time: 18,
                        userID: userDetailsResponse.id
                      }, 'post_booking.php')
                        .then((bookingDetailsResponse) => console.log(bookingDetailsResponse))
                    })}
                />
              </form>
          </div>
      );
    }
}
export default ContactForm;
