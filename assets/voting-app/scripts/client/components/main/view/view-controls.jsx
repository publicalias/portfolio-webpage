"use strict";

//local imports

const PollToggle = require("../poll/poll-toggle");

//node modules

const React = require("react");

//view controls

const ViewControls = (props) => {

  const { data: { user }, local: { poll } } = props;

  const { jsx: { PollToggle } } = ViewControls.injected;

  //events

  const handleShare = () => {
    navigator.clipboard.writeText(location.href);
  };

  //render

  const auth = user.type === "auth";

  return (
    <div className="c-view-menu__display-box u-flex-right">
      <button className="c-view-menu__button qa-click-share" onClick={handleShare}>Share</button>
      <div className="c-view-menu__button">
        <PollToggle
          {...props}
          local={{
            poll,
            role: "hide"
          }}
        />
      </div>
      {auth && (
        <div className="c-view-menu__button">
          <PollToggle
            {...props}
            local={{
              poll,
              role: "flag"
            }}
          />
        </div>
      )}
    </div>
  );

};

ViewControls.propList = ["data.user", "local"];

ViewControls.injected = { jsx: { PollToggle } };

//exports

module.exports = ViewControls;
