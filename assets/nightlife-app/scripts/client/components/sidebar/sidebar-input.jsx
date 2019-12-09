"use strict";

//local imports

const { getLocation } = require("../../app-logic");

//node modules

const React = require("react");

//sidebar input

const SidebarInput = (props) => {

  const { local: { actions: { change, submit }, bool, placeholder, text } } = props;

  const { lib: { getLocation } } = SidebarInput.injected;

  //events

  const handleChange = (event) => {
    change(event.target.value);
  };

  const handleSubmit = async () => {

    await submit(text, await getLocation());

    change("");

  };

  //render

  return (
    <div className="c-sidebar__input-box">
      <input
        className="c-sidebar__input qa-change-input"
        maxLength="1000"
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

SidebarInput.propList = ["local"];

SidebarInput.injected = { lib: { getLocation } };

//exports

module.exports = SidebarInput;
