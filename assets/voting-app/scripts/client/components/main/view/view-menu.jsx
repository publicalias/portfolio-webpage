"use strict";

//local imports

const ViewControls = require("./view-controls");
const ViewSettings = require("./view-settings");

//node modules

const React = require("react");

//view menu

const ViewMenu = (props) => {

  const { actions: { viewToggleSettings }, data: { user, view: { menu } }, local: { poll } } = props;

  const { jsx: { ViewControls, ViewSettings } } = ViewMenu.injected;

  //events

  const handleClick = () => {
    viewToggleSettings();
  };

  //render

  const created = user.id === poll.users.created;

  return (
    <div className="c-view-menu">
      {created && (
        <button
          className="c-view-menu__control-btn qa-toggle-settings"
          onClick={handleClick}
        >
          Settings
        </button>
      )}
      {created && menu.settings ? <ViewSettings {...props} /> : <ViewControls {...props} />}
    </div>
  );

};

ViewMenu.propList = ["data.user", "data.view.menu", "local"];

ViewMenu.injected = {
  jsx: {
    ViewControls,
    ViewSettings
  }
};

//exports

module.exports = ViewMenu;
