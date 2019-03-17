"use strict";

/*global grecaptcha*/

//local imports

const ContactForm = require("./contact-form");
const MediaIcons = require("./media-icons");

const { resetForm, useReCaptcha } = require("../../app-logic");

//global imports

const { encodeAPICall } = require("client-utils");
const { useSetState } = require("react-utils");

//node modules

const React = require("react");

//contact

const Contact = (props) => {

  //state

  const [state, setState] = useSetState(resetForm(0));

  //utilities

  const getReCaptcha = async (data) => {

    const { path, init } = encodeAPICall({
      path: "/portfolio-webpage/contact",
      method: "POST",
      data: Object.assign({ verify: data }, state)
    });

    setState({ btnIndex: 1 });

    try {

      const res = await fetch(path, init);

      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }

      setState(resetForm(2));

    } catch {
      setState({ btnIndex: 3 });
    }

    grecaptcha.reset();

  };

  //events

  const handleChange = (event) => {
    if (state.btnIndex !== 1) {
      setState({
        [event.target.name]: event.target.value,
        btnIndex: 0
      });
    }
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    grecaptcha.execute();

  };

  //lifecycle

  useReCaptcha(getReCaptcha);

  //render

  return (
    <div className="c-content--xl js-scroll-contact">
      <div className="c-row">
        <div className="c-row__col--4">
          <h1>Contact</h1>
        </div>
        <div className="c-row__col--8">
          <ContactForm
            body={state.body}
            btnIndex={state.btnIndex}
            email={state.email}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            subject={state.subject}
          />
          <MediaIcons contact={props.contact} />
          <div
            className="g-recaptcha"
            data-callback="getReCaptcha"
            data-sitekey="6LexgzMUAAAAAE0tcL9o2_Tt0Clqk8xpQhhdlFDO"
            data-size="invisible"
          />
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = Contact;
