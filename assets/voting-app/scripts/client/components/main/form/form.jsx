"use strict";

//local imports

const FormMenu = require("./form-menu");
const FormOptions = require("./form-options");
const FormPoll = require("./form-poll");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//form

const Form = (props) => {

  const { actions: { formClearState } } = props;

  const { jsx: { FormMenu, FormOptions, FormPoll } } = Form.injected;

  //lifecycle

  useLayoutEffect(formClearState, []);

  //render

  return (
    <React.Fragment>
      <FormMenu {...props} />
      <FormPoll {...props} />
      <FormOptions {...props} />
    </React.Fragment>
  );

};

Form.propList = [];

Form.injected = {
  jsx: {
    FormMenu,
    FormOptions,
    FormPoll
  }
};

//exports

module.exports = Form;
