"use strict";

//node modules

const React = require("react");

//contact form

const ContactForm = (props) => {

  const btnText = ["Send", "Sending...", "Your message has been sent!", "Your message could not be sent."];

  return (
    <form className="u-margin-full" onSubmit={props.handleSubmit}>
      <input
        className="u-margin-half"
        maxLength="100"
        name="email"
        onChange={props.handleChange}
        placeholder="Email"
        required
        type="email"
        value={props.email}
      />
      <input
        className="u-margin-half"
        maxLength="100"
        name="subject"
        onChange={props.handleChange}
        placeholder="Subject"
        value={props.subject}
      />
      <textarea
        className="c-field--lg u-margin-half"
        maxLength="3000"
        name="body"
        onChange={props.handleChange}
        placeholder="Body"
        required
        value={props.body}
      />
      <button
        className="c-wide-btn"
        disabled={props.btnIndex}
        type="submit"
      >
        {btnText[props.btnIndex]}
      </button>
    </form>
  );

};

//exports

module.exports = ContactForm;