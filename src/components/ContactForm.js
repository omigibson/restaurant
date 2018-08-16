import React from 'react';
const ContactForm = () => {
    return (
        <div className="contact-form">
            <h2>Contact details</h2>
            <form>
              <input type="text" placeholder="Name" name="name" />
              <input type="email" placeholder="Email" name="email" />
              <input type="tel" placeholder="Tel" name="tel" />
              <input type="submit" value="Book" />
            </form>
        </div>
    );
}
export default ContactForm;
