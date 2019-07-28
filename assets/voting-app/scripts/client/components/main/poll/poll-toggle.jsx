"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");

//node modules

const React = require("react");

//poll toggle

const PollToggle = (props) => {

  const { actions: { pollToggleFlag, pollToggleHide }, data: { user }, local: { list, poll, role } } = props;

  //events

  const handleFlag = () => {
    handleReload(() => pollToggleFlag(poll.id), props, list);
  };

  const handleHide = () => {
    handleReload(() => pollToggleHide(poll.id), props, list);
  };

  //render

  const toggled = (prop) => poll.users[prop].includes(user.id);

  const hideIcon = toggled("hidden") ? "fa fa-eye-slash" : "fa fa-eye";
  const flagIcon = toggled("flagged") ? "fa fa-flag" : "fa fa-flag-o";

  return role === "flag" ? (
    <button className="qa-toggle-flag" onClick={handleFlag}>
      <i className={flagIcon} />
    </button>
  ) : (
    <button className="qa-toggle-hide" onClick={handleHide}>
      <i className={hideIcon} />
    </button>
  );

};

PollToggle.propList = ["data.user", "local"];

//exports

module.exports = PollToggle;
