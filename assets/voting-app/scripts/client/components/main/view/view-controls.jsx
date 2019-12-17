"use strict";

//local imports

const MetaPollToggle = require("../meta/meta-poll-toggle");

//node modules

const React = require("react");

//view controls

const ViewControls = (props) => {

  const { data: { user }, local: { poll } } = props;

  const { jsx: { MetaPollToggle } } = ViewControls.injected;

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
        <MetaPollToggle
          {...props}
          local={{
            poll,
            role: "hide"
          }}
        />
      </div>
      {auth && (
        <div className="c-view-menu__button">
          <MetaPollToggle
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

ViewControls.injected = { jsx: { MetaPollToggle } };

//exports

module.exports = ViewControls;
