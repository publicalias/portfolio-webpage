"use strict";

//local imports

const FormMenu = require("./form-menu");
const PollDisplay = require("../poll/poll-display");
const PollOptions = require("../poll/poll-options");

//node modules

const React = require("react");

const { useEffect } = React;

//form

const Form = (props) => {

  const { actions: { formClearState }, data: { form } } = props;

  //lifecycle

  useEffect(formClearState, []);

  //render

  const local = {
    poll: form,
    role: "form"
  };

  return (
    <div className="c-ui__form">
      <FormMenu {...props} />
      <PollDisplay {...props} local={local} />
      <PollOptions {...props} local={local} />
    </div>
  );

};

//exports

module.exports = Form;
