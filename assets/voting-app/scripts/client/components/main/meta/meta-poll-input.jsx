"use strict";

//node modules

const React = require("react");

//meta poll input

const MetaPollInput = (props) => {

  const { local: { handleChange, handleSubmit, value } } = props;

  //render

  return (
    <div className="c-meta-poll-options__input-box">
      <input
        className="c-meta-poll-options__input qa-change-input u-margin-right"
        maxLength="100"
        onChange={handleChange}
        placeholder="New Option (Up to 20)"
        value={value}
      />
      <button
        className="c-meta-poll-options__submit qa-submit-input"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );

};

MetaPollInput.propList = ["local"];

//exports

module.exports = MetaPollInput;
