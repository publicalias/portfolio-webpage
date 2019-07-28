"use strict";

//local imports

const PollChart = require("./poll-chart");
const PollTitle = require("./poll-title");

//node modules

const React = require("react");

//poll display

const PollDisplay = (props) => {

  const { jsx: { PollChart, PollTitle } } = PollDisplay.injected;

  return (
    <div className="c-poll-display">
      <PollTitle {...props} />
      <hr />
      <PollChart {...props} />
    </div>
  );

};

PollDisplay.propList = [];

PollDisplay.injected = {
  jsx: {
    PollChart,
    PollTitle
  }
};

//exports

module.exports = PollDisplay;
