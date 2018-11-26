"use strict";

//local imports

const Controls = require("./controls");
const Options = require("./options");

//node modules

const React = require("react");

//poll view

const PollView = () => (
  <div className="c-poll--view js-resize-poll">
    <div className="c-row">
      <div className="c-row__col--4">
        <Controls />
        <Options />
      </div>
      <div className="c-row__col--8">
        <h3 className="u-align-center u-margin-half">Most Common Surname</h3>
        <h4 className="u-align-center">Poll by John Smith</h4>
        <hr />
        <img src="https://via.placeholder.com/500x500?text=undefined" />
      </div>
    </div>
  </div>
);

//exports

module.exports = PollView;
