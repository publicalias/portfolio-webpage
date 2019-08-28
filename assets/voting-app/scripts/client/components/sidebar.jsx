"use strict";

//global imports

const AuthButtons = require("components/auth-buttons");

//node modules

const React = require("react");

//sidebar

const Sidebar = (props) => {

  const { data: { user } } = props;

  const { jsx: { AuthButtons } } = Sidebar.injected;

  //render

  return (
    <div className="c-ui__sidebar">
      <p>{`Hi, ${user.name || "Anonymous"}!`}</p>
      <hr />
      <AuthButtons {...props} />
    </div>
  );

};

Sidebar.propList = ["data.user"];

Sidebar.injected = { jsx: { AuthButtons } };

//exports

module.exports = Sidebar;
