"use strict";

//global imports

const { select } = require("dom-api");

//submit keys

const submitKeys = (id) => {

  const pairID = id ? `-${id}` : "";

  const DOMInput = select(`.js-submit-input${pairID}`);
  const DOMButton = select(`.js-submit-button${pairID}`);

  DOMInput.on("keydown", (event) => {
    if (event.key === "Enter") {
      DOMButton.focus(); //fires event
    }
  });

  DOMButton.on("keydown", (event) => {

    const ignore = ["Enter", "Tab", "Shift"];

    if (!ignore.includes(event.key)) {
      DOMInput.focus();
    }

  });

};

//exports

module.exports = { submitKeys };
