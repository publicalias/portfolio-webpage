"use strict";

//local imports

const FormMenu = require("./form-menu");
const PollDisplay = require("../poll/poll-display");

//node modules

const React = require("react");

const { useEffect } = React;

//form

const Form = (props) => {

  const { actions: { formClearState }, data: { form } } = props;

  //lifecycle

  useEffect(formClearState, []);

  //render

  return (
    <div className="c-ui__form">
      <FormMenu {...props} />
      <PollDisplay
        {...props}
        local={{
          poll: form,
          role: "form"
        }}
      />
      <div className="c-poll-options" />
    </div>
  );

};

//exports

module.exports = Form;
