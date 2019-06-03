"use strict";

//local imports

const FormMenu = require("./form-menu");

//node modules

const React = require("react");

const { useEffect } = React;

//form

const Form = (props) => {

  const { actions: { formClearState } } = props;

  //lifecycle

  useEffect(formClearState, []);

  //render

  return (
    <div className="c-form c-ui__form">
      <FormMenu {...props} />
      <div className="c-form__display" />
      <div className="c-form__options" />
    </div>
  );

};

//exports

module.exports = Form;
