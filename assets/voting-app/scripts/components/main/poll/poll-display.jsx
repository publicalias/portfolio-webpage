"use strict";

//local imports

const PollChart = require("./poll-chart");
const PollTitle = require("./poll-title");

//node modules

const React = require("react");

//poll display

const PollDisplay = (props) => (
  <div className="c-poll-display">
    <PollTitle {...props} />
    <hr />
    <PollChart {...props} />
  </div>
);

//exports

module.exports = PollDisplay;
