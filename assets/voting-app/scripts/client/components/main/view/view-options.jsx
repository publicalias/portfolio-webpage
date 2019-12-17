"use strict";

//local imports

const MetaPollInput = require("../meta/meta-poll-input");
const MetaPollOption = require("../meta/meta-poll-option");

const { chartColor } = require("../../../view-logic");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//view options

const ViewOptions = (props) => {

  const {
    actions: { pollAddOption, pollCastVote, pollRemoveOption, pollRemoveVote, viewSetAdd },
    data: { user, view },
    local: { bool: { canAdd, hasOptions }, poll }
  } = props;

  const { jsx: { MetaPollInput, MetaPollOption }, lib: { chartColor } } = ViewOptions.injected;

  //events

  const handleChange = (event) => {
    viewSetAdd(event.target.value);
  };

  const handleRemove = (text, voted) => (event) => {

    if (voted) {
      return;
    }

    event.stopPropagation();

    pollRemoveOption(poll.id, text);

  };

  const handleSubmit = async () => {

    const res = await pollAddOption(poll.id, view.add);

    if (res && !res.errors) {
      viewSetAdd("");
    }

  };

  const handleVote = (text, voted) => () => {
    if (voted) {
      pollRemoveVote(poll.id);
    } else {
      pollCastVote(poll.id, text);
    }
  };

  //render

  const keyGen = initKeyGen();

  const util = `u-margin-half${canAdd ? "" : "--negative"}`;

  return (canAdd || hasOptions) && (
    <div className="c-meta-poll-options">
      {hasOptions && (
        <div className={util}>
          {poll.options.map((e, i) => {

            const created = user.id === poll.users.created || user.id === e.created;
            const fill = chartColor(i, poll.options);
            const text = e.text;
            const voted = e.voted.includes(user.id);

            return (
              <MetaPollOption
                key={keyGen(text)}
                local={{
                  created,
                  fill,
                  handleRemove: handleRemove(text, voted),
                  handleVote: handleVote(text, voted),
                  text,
                  voted
                }}
              />
            );

          })}
        </div>
      )}
      {canAdd && (
        <MetaPollInput
          local={{
            handleChange,
            handleSubmit,
            value: view.add
          }}
        />
      )}
    </div>
  );

};

ViewOptions.propList = ["data.user", "data.view", "local"];

ViewOptions.injected = {
  jsx: {
    MetaPollInput,
    MetaPollOption
  },
  lib: { chartColor }
};

//exports

module.exports = ViewOptions;
