"use strict";

//local imports

const ViewControls = require("./view-controls");
const ViewSettings = require("./view-settings");

//node modules

const React = require("react");

//view menu

const ViewMenu = (props) => {

  const { actions: { viewToggleSettings }, data: { user, view }, poll } = props;

  //events

  const handleSettings = () => {
    viewToggleSettings();
  };

  //render

  const created = user.id === poll.users.created;

  return (
    <div className="c-view-menu">
      {created && (
        <button
          className="c-view-menu__control-btn qa-toggle-settings"
          onClick={handleSettings}
        >
          Settings
        </button>
      )}
      {created && view.settings ? <ViewSettings {...props} /> : <ViewControls {...props} />}
    </div>
  );

};

//exports

module.exports = ViewMenu;
