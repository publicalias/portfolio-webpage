"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");

//global imports

const { submitKeys } = require("client-utils");

//node modules

const React = require("react");

const { useEffect } = React;

//poll input

const PollInput = (props) => {

  const {
    actions: { formAddOption, formSetAdd, pollAddOption, viewSetAdd },
    data: { form, view },
    local: { poll, role }
  } = props;

  const { lib: { submitKeys } } = PollInput.injected;

  //events

  const handleChange = (event) => {
    if (role === "form") {
      formSetAdd(event.target.value);
    } else {
      viewSetAdd(event.target.value);
    }
  };

  const handleSubmit = () => {
    if (role === "form") {
      formAddOption(form.add, form.options);
    } else {
      handleReload(() => pollAddOption(poll.id, view.add), props);
      viewSetAdd("");
    }
  };

  //lifecycle

  useEffect(() => submitKeys(role), []);

  //render

  const value = role === "form" ? form.add : view.add;

  return (
    <div className="c-poll-options__input-box">
      <input
        className={`c-poll-options__input js-submit-input-${role} qa-option-input u-margin-right`}
        maxLength="100"
        onChange={handleChange}
        placeholder="New Option (Up to 20)"
        value={value}
      />
      <button
        className={`c-poll-options__submit js-submit-button-${role} qa-option-submit`}
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );

};

PollInput.injected = { lib: { submitKeys } };

//exports

module.exports = PollInput;
