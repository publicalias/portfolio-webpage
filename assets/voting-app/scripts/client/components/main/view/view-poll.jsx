"use strict";

//local imports

const MetaPollDisplay = require("../meta/meta-poll-display");

//node modules

const React = require("react");

//view poll

const ViewPoll = (props) => {

  const { local: { bool: { canAdd, hasOptions }, poll } } = props;

  const { jsx: { MetaPollDisplay } } = ViewPoll.injected;

  //render

  const util = `c-meta-poll-display${canAdd || hasOptions ? "" : "--tall"}`;

  return (
    <div className={util}>
      <div className="u-align-center">
        <h1 className="u-margin-half">{poll.title || "Untitled"}</h1>
        <h4>{`By ${poll.author || "Anonymous"}`}</h4>
      </div>
      <hr />
      <MetaPollDisplay
        local={{
          counts: poll.options.map((e) => e.voted.length),
          labels: poll.options.map((e) => e.text)
        }}
      />
    </div>
  );

};

ViewPoll.propList = ["local"];

ViewPoll.injected = { jsx: { MetaPollDisplay } };

//exports

module.exports = ViewPoll;
