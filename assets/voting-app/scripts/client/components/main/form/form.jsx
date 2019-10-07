"use strict";

//local imports

const FormMenu = require("./form-menu");
const Poll = require("../poll/poll");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//form

const Form = (props) => {

  const { actions: { formClearState }, data: { form } } = props;

  const { jsx: { FormMenu, Poll } } = Form.injected;

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
      <Poll {...props} local={local} />
    </React.Fragment>
  );

};

Form.propList = ["data.form"];

Form.injected = {
  jsx: {
    FormMenu,
    Poll
  }
};

//exports

module.exports = Form;
