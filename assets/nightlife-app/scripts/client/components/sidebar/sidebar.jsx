"use strict";

//local imports

const SidebarInput = require("./sidebar-input");

//global imports

const AuthButtons = require("redux/components/auth-buttons");

//node modules

const React = require("react");

//sidebar

const Sidebar = (props) => {

  const { actions, data: { user, account } } = props;

  const { metaToggleSettings } = actions;

  const { jsx: { AuthButtons, SidebarInput } } = Sidebar.injected;

  //events

  const handleClick = () => {
    metaToggleSettings();
  };

  //render

  const auth = user.type === "auth";

  const inputProps = (type, prop = type.toLowerCase()) => ({
    actions: {
      change: actions[`metaSet${type}`],
      submit: actions[`metaSave${type}`]
    },
    bool: user.data[prop],
    placeholder: type,
    text: account[prop]
  });

  return (
    <div className="c-sidebar">
      <h4 className="u-align-left">{`Hi, ${user.name || "Anonymous"}!`}</h4>
      <hr />
      <div className="c-sidebar__buttons">
        {auth && (
          <React.Fragment>
            <button className="c-sidebar__toggle qa-toggle-settings" onClick={handleClick}>Settings</button>
            {account.settings && (
              <React.Fragment>
                <p className="u-margin-none">Tip: Set your address to "DEMO" to interact with the demo users.</p>
                <SidebarInput local={inputProps("Address")} />
                <SidebarInput local={inputProps("Avatar")} />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        <AuthButtons {...props} local={{ redirect: "/nightlife-app" }} />
      </div>
    </div>
  );

};

Sidebar.propList = ["data.user", "data.account"];

Sidebar.injected = {
  jsx: {
    AuthButtons,
    SidebarInput
  }
};

//exports

module.exports = Sidebar;
