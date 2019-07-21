"use strict";

//local imports

const PollInput = require("./poll-input");
const PollList = require("./poll-list");

//node modules

const React = require("react");

//poll options

const PollOptions = (props) => {

  const { data: { user, polls }, local: { poll, role } } = props;

  const { jsx: { PollInput, PollList } } = PollOptions.injected;

  //render

  const canAdd = user.type === "auth" && (role === "form" || polls[0] && polls[0].id === poll.id);

  const hasOptions = poll.options.length > 0;

  const local = {
    poll,
    role
  };

  return (canAdd || hasOptions) && (
    <div className="c-poll-options">
      {hasOptions && <PollList {...props} local={local} />}
      {canAdd && <PollInput {...props} local={local} />}
    </div>
  );

};

PollOptions.injected = {
  jsx: {
    PollInput,
    PollList
  }
};

//exports

module.exports = PollOptions;
