"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");

//node modules

const React = require("react");

//poll toggle

const PollToggle = (props) => {

  const { actions: { pollToggleFlag, pollToggleHide }, data: { user }, list, poll: { id, users }, type } = props;

  //render

  const toggled = (prop) => users[prop].includes(user.id);

  const hideIcon = toggled("hidden") ? "fa fa-eye-slash" : "fa fa-eye";
  const flagIcon = toggled("flagged") ? "fa fa-flag" : "fa fa-flag-o";

  switch (type) {
    case "flag":
      return (
        <button
          className="qa-toggle-flag"
          onClick={handleReload(() => pollToggleFlag(id), props, list)}
        >
          <i className={flagIcon} />
        </button>
      );
    case "hide":
      return (
        <button
          className="qa-toggle-hide"
          onClick={handleReload(() => pollToggleHide(id), props, list)}
        >
          <i className={hideIcon} />
        </button>
      );
    default:
      return null;
  }

};

//exports

module.exports = PollToggle;
