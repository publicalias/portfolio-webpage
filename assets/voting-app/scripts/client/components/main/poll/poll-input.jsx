"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");

//node modules

const React = require("react");

//poll input

const PollInput = (props) => {

  const {
    actions: { formAddOption, formSetAdd, pollAddOption, viewSetAdd },
    data: { form, view },
    local: { poll, role }
  } = props;

  //events

  const handleChange = (event) => {
    if (role === "form") {
      formSetAdd(event.target.value);
    } else {
      viewSetAdd(event.target.value);
    }
  };

  const handleSubmit = async () => {
    if (role === "form") {
      formAddOption(form.add, form.options);
    } else {

      const res = await handleReload(() => pollAddOption(poll.id, view.add), props);

      if (res && !res.errors) {
        viewSetAdd("");
      }

    }
  };

  //render

  const value = role === "form" ? form.add : view.add;

  return (
    <div className="c-poll-options__input-box">
      <input
        className="c-poll-options__input qa-option-input u-margin-right"
        maxLength="100"
        onChange={handleChange}
        placeholder="New Option (Up to 20)"
        value={value}
      />
      <button
        className="c-poll-options__submit qa-option-submit"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );

};

PollInput.propList = ["data.form", "data.view", "local"];

//exports

module.exports = PollInput;
