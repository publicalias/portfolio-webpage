"use strict";

//local imports

const SidebarInput = require("./sidebar-input");

//global imports

const AuthButtons = require("redux/components/auth-buttons");

//node modules

const React = require("react");

//sidebar

const Sidebar = (props) => {

  const { actions: { metaToggleSettings }, data: { user, account } } = props;

  const { jsx: { AuthButtons, SidebarInput } } = Sidebar.injected;

  //events

  const handleClick = () => {
    metaToggleSettings();
  };

  //render

  const auth = user.type === "auth";

  return (
    <div className="c-sidebar">
      <p>{`Hi, ${user.name || "Anonymous"}!`}</p>
      <hr />
      {auth && (
        <React.Fragment>
          <button className="c-sidebar__toggle qa-toggle-settings" onClick={handleClick}>Settings</button>
          {account.settings && (
            <React.Fragment>
              <SidebarInput
                {...props}
                local={{ type: "address" }}
              />
              <SidebarInput
                {...props}
                local={{ type: "avatar" }}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <AuthButtons {...props} local={{ redirect: "/nightlife-app" }} />
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
