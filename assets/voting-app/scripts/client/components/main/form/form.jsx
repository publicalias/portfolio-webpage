"use strict";

//local imports

const FormMenu = require("./form-menu");
const PollDisplay = require("../poll/poll-display");
const PollOptions = require("../poll/poll-options");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//form

const Form = (props) => {

  const { actions: { formClearState }, data: { form } } = props;

  const { jsx: { FormMenu, PollDisplay, PollOptions } } = Form.injected;

  //lifecycle

  useLayoutEffect(formClearState, []);

  //render

  const local = {
    poll: form,
    role: "form"
  };

  return (
    <React.Fragment>
      <FormMenu {...props} />
      <PollDisplay {...props} local={local} />
      <PollOptions {...props} local={local} />
    </React.Fragment>
  );

};

Form.propList = ["data.form"];

Form.injected = {
  jsx: {
    FormMenu,
    PollDisplay,
    PollOptions
  }
};

//exports

module.exports = Form;
