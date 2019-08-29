"use strict";

//local imports

const PollIcon = require("./poll-icon");

const { handleReload } = require("../../../event-handlers");
const { chartColor } = require("../../../view-logic");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//poll list

const PollList = (props) => {

  const { actions: { pollCastVote }, data: { user }, local: { poll, role } } = props;

  const { lib: { chartColor } } = PollList.injected;

  //events

  const handleVote = (text) => () => {
    if (role === "view") {
      handleReload(() => pollCastVote(poll.id, text), props);
    }
  };

  //render

  const keyGen = initKeyGen();

  const auth = user.type === "auth";

  return (
    <div className={`u-margin-half${auth ? "" : "--negative"}`}>
      {poll.options.map((e, i) => {

        const text = role === "form" ? e : e.text;

        const view = {
          created: role === "form" || user.id === poll.users.created || user.id === e.created,
          fill: chartColor(i, poll.options),
          text,
          voted: role === "view" && e.voted.includes(user.id)
        };

        return (
          <button
            className="c-poll-options__option u-margin-half u-margin-right qa-option-vote"
            key={keyGen(text)}
            onClick={handleVote(text)}
          >
            <div className="c-poll-options__layout">
              <PollIcon
                {...props}
                local={{
                  poll,
                  role,
                  view
                }}
              />
              <span>{text}</span>
            </div>
          </button>
        );

      })}
    </div>
  );

};

PollList.propList = ["data.user", "local"];

PollList.injected = { lib: { chartColor } };

//exports

module.exports = PollList;
