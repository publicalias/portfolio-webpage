"use strict";

//local imports

const PollChart = require("./poll-chart");
const PollInput = require("./poll-input");
const PollList = require("./poll-list");
const PollTitle = require("./poll-title");

//node modules

const React = require("react");

//poll

const Poll = (props) => {

  const { data: { user, polls }, local: { poll, role } } = props;

  const { jsx: { PollChart, PollInput, PollList, PollTitle } } = Poll.injected;

  //render

  const canAdd = user.type === "auth" && (role === "form" || polls[0] && polls[0].id === poll.id);
  const hasOptions = poll.options.length > 0;

  const display = canAdd || hasOptions;

  return (
    <React.Fragment>
      <div className={`c-poll-display${display ? "" : "--tall"}`}>
        <PollTitle {...props} />
        <hr />
        <PollChart {...props} />
      </div>
      {display && (
        <div className="c-poll-options">
          {hasOptions && <PollList {...props} />}
          {canAdd && <PollInput {...props} />}
        </div>
      )}
    </React.Fragment>
  );

};

Poll.propList = ["data.user", "data.polls", "local"];

Poll.injected = {
  jsx: {
    PollChart,
    PollInput,
    PollList,
    PollTitle
  }
};

//exports

module.exports = Poll;
