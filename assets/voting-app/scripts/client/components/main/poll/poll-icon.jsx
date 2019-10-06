"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");

//node modules

const React = require("react");

//poll icon

const PollIcon = (props) => {

  const { actions: { formRemoveOption, pollRemoveOption, pollRemoveVote }, local: { poll, role, view } } = props;

  const { created, fill, text, voted } = view;

  //events

  const handleRemove = (text, voted) => (event) => {

    event.stopPropagation();

    if (role === "view") {
      if (voted) {
        handleReload(() => pollRemoveVote(poll.id), props);
      } else {
        handleReload(() => pollRemoveOption(poll.id, text), props);
      }
    } else {
      formRemoveOption(text);
    }

  };

  //render

  return created || voted ? (
    <span className="c-poll-options__remove qa-option-remove" onClick={handleRemove(text, voted)}>
      <i className={voted ? "fas fa-times" : "fas fa-trash-alt"} />
    </span>
  ) : (
    <svg className="c-poll-options__color-box">
      <rect
        className="c-poll-options__color-icon"
        fill={fill}
        height="100%"
        width="100%"
      />
    </svg>
  );

};

PollIcon.propList = ["local"];

//exports

module.exports = PollIcon;
