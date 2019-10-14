"use strict";

//global imports

const { capitalize } = require("all/utilities");

//node modules

const React = require("react");

//input

const Input = (props) => {

  const { actions, data: { user, account }, local: { type } } = props;

  const { metaGetUser } = actions;

  //utilities

  const label = capitalize(type);

  const { actions: { change, submit }, bool, placeholder, text } = {
    actions: {
      change: actions[`metaSet${label}`],
      submit: actions[`metaSave${label}`]
    },
    bool: user.data[type],
    placeholder: label,
    text: account[type]
  };

  //events

  const handleChange = (event) => {
    change(event.target.value);
  };

  const handleSubmit = async () => {

    await submit(text);

    change("");

    metaGetUser();

  };

  //render

  return (
    <div className="c-sidebar__input-box">
      <input
        className="c-sidebar__input qa-account-input"
        onChange={handleChange}
        placeholder={placeholder}
        value={text}
      />
      <button
        className="c-sidebar__submit qa-account-submit"
        onClick={handleSubmit}
      >
        {bool && !text ? "Reset" : "Set"}
      </button>
    </div>
  );

};

Input.propList = ["data.user", "data.account", "local"];

//exports

module.exports = Input;
