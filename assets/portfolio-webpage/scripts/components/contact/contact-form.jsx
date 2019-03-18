"use strict";

//node modules

const React = require("react");

//contact form

const ContactForm = (props) => {

  const { email, subject, body, btnIndex, handleSubmit, handleChange } = props;

  const btnText = ["Send", "Sending...", "Your message has been sent!", "Your message could not be sent."];

  return (
    <form className="u-margin-full" onSubmit={handleSubmit}>
      <input
        className="u-margin-half"
        maxLength="100"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        required
        type="email"
        value={email}
      />
      <input
        className="u-margin-half"
        maxLength="100"
        name="subject"
        onChange={handleChange}
        placeholder="Subject"
        value={subject}
      />
      <textarea
        className="c-field--lg u-margin-half"
        maxLength="3000"
        name="body"
        onChange={handleChange}
        placeholder="Body"
        required
        value={body}
      />
      <button
        className="c-wide-btn"
        disabled={btnIndex}
        type="submit"
      >
        {btnText[btnIndex]}
      </button>
    </form>
  );

};

//exports

module.exports = ContactForm;
