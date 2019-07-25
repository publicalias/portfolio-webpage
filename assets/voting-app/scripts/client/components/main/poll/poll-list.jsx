"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");
const { chartColor } = require("../../../view-logic");

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//poll list

const PollList = (props) => {

  const {
    actions: { formRemoveOption, pollCastVote, pollRemoveOption },
    data: { user },
    local: { poll, role }
  } = props;

  const { lib: { chartColor } } = PollList.injected;

  //events

  const handleVote = (text) => () => {
    if (role === "view") {
      handleReload(() => pollCastVote(poll.id, text), props);
    }
  };

  const handleRemove = (text) => (event) => {

    event.stopPropagation();

    if (role === "form") {
      formRemoveOption(text);
    } else {
      handleReload(() => pollRemoveOption(poll.id, text), props);
    }

  };

  //render

  const keyGen = initKeyGen();

  const auth = user.type === "auth";

  return (
    <div className={`u-margin-half${auth ? "" : "--negative"}`}>
      {poll.options.map((e, i) => {

        const created = role === "form" || user.id === poll.users.created || user.id === e.created;
        const text = role === "form" ? e : e.text;

        return (
          <button
            className="c-poll-options__option u-margin-half u-margin-right qa-option-vote"
            key={keyGen(text)}
            onClick={handleVote(text)}
          >
            <div className="c-poll-options__layout">
              {created ? (
                <span className="c-poll-options__remove qa-option-remove" onClick={handleRemove(text)}>
                  <i className="fa fa-close" />
                </span>
              ) : (
                <svg className="c-poll-options__color-box">
                  <rect className="c-poll-options__color-icon" fill={chartColor(i, poll.options)} />
                </svg>
              )}
              <span>{text}</span>
            </div>
          </button>
        );

      })}
    </div>
  );

};

PollList.injected = { lib: { chartColor } };

//exports

module.exports = PollList;
