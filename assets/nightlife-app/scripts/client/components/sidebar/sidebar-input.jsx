"use strict";

//local imports

const { getLocation } = require("../../app-logic");

//global imports

const { capitalize } = require("all/utilities");

//node modules

const React = require("react");

//sidebar input

const SidebarInput = (props) => {

  const { actions, data: { user, account }, local: { type } } = props;

  const { metaGetUser } = actions;

  const { lib: { getLocation } } = SidebarInput.injected;

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

    await submit(text, await getLocation());

    change("");

    metaGetUser();

  };

  //render

  return (
    <div className="c-sidebar__input-box">
      <input
        className="c-sidebar__input qa-change-input"
        maxLength="100"
        onChange={handleChange}
        placeholder={placeholder}
        value={text}
      />
      <button
        className="c-sidebar__submit qa-submit-input"
        onClick={handleSubmit}
      >
        {bool && !text ? "Reset" : "Set"}
      </button>
    </div>
  );

};

SidebarInput.propList = ["data.user", "data.account", "local"];

SidebarInput.injected = { lib: { getLocation } };

//exports

module.exports = SidebarInput;
