"use strict";

//submit keys

const submitKeys = (id) => (event) => {

  const pairID = id ? `-${id}` : "";

  const input = `.js-submit-input${pairID}`;
  const button = `.js-submit-button${pairID}`;

  const active = $(document.activeElement)
    .attr("class")
    .split(" ")
    .map((e) => `.${e}`);

  const enterFn = () => {
    if (active.includes(input)) {
      $(button).focus(); //fires event
    }
  };

  const otherFn = () => {
    if (active.includes(button)) {
      $(input).focus();
    }
  };

  switch (event.key) {
    case "Enter":
      enterFn();
      break;
    case "Tab":
    case "shift":
      break;
    default:
      otherFn();
  }

};

//exports

module.exports = { submitKeys };
