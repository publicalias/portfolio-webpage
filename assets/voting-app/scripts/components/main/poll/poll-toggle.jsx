"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");

//node modules

const React = require("react");

//poll toggle

const PollToggle = (props) => {

  const { actions: { pollToggleFlag, pollToggleHide }, data: { user }, list, poll, type } = props;

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

  switch (type) {
    case "flag":
      return <button className="qa-toggle-flag" onClick={handleFlag}><i className={flagIcon} /></button>;
    case "hide":
      return <button className="qa-toggle-hide" onClick={handleHide}><i className={hideIcon} /></button>;
    default:
      return null;
  }

};

//exports

module.exports = PollToggle;
