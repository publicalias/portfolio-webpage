"use strict";

//local imports

const PollToggle = require("../poll/poll-toggle");

//node modules

const React = require("react");

//view controls

const ViewControls = (props) => {

  const { data: { user } } = props;

  //events

  const handleShare = () => {
    navigator.clipboard.writeText(location.href);
  };

  //render

  const auth = user.type === "auth";

  return (
    <div className="c-view-menu__display-box u-flex-right">
      <button className="c-view-menu__toggle-btn qa-share-poll" onClick={handleShare}>Share</button>
      <div className="c-view-menu__toggle-btn">
        <PollToggle {...props} type="hide" />
      </div>
      <div className="c-view-menu__toggle-btn">
        {auth && <PollToggle {...props} type="flag" />}
      </div>
    </div>
  );

};

//exports

module.exports = ViewControls;
