"use strict";

//local imports

const PollTitle = require("./poll-title");

//node modules

const React = require("react");

//poll display

const PollDisplay = (props) => (
  <div className="c-poll-display">
    <PollTitle {...props} />
    <hr />
    <div className="c-poll-display__chart" />
  </div>
);

//exports

module.exports = PollDisplay;
