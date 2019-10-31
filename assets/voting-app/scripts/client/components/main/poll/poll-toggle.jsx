"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");

//node modules

const React = require("react");

//poll toggle

const PollToggle = (props) => {

  const { actions: { pollToggleFlag, pollToggleHide }, data: { user }, local: { list, poll, role, util } } = props;

  //utilities

  const toggled = (prop) => poll.users[prop].includes(user.id);

  const handler = (fn) => () => {
    handleReload(() => fn(poll.id), props, list);
  };

  const { handleClick, icon } = ((data) => data[role])({
    flag: {
      handleClick: handler(pollToggleFlag),
      icon: toggled("flagged") ? "fas fa-flag" : "far fa-flag"
    },
    hide: {
      handleClick: handler(pollToggleHide),
      icon: toggled("hidden") ? "far fa-eye-slash" : "far fa-eye"
    }
  });

  //render

  return (
    <button
      className={`c-icon-button qa-toggle-${role} ${util || ""}`}
      onClick={handleClick}
    >
      <i className={icon} />
    </button>
  );

};

PollToggle.propList = ["data.user", "local"];

//exports

module.exports = PollToggle;
