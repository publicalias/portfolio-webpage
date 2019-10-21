"use strict";

//global imports

const MetaNavBar = require("redux/components/meta-nav-bar");

//node modules

const React = require("react");

//nav bar

const NavBar = (props) => {

  const { data: { user } } = props;

  const { jsx: { MetaNavBar } } = NavBar.injected;

  //utilities

  const auth = user.type === "auth";

  const list = [
    ["venues", "Venues", true, "/venues/list"],
    ["users", "Users", true, "/users/list"],
    ["my-page", "My Page", auth, `/users/page/${user.id}`, "u-flex-right"]
  ];

  //render

  return <MetaNavBar local={{ list }} />;

};

NavBar.propList = ["data.user"];

NavBar.injected = { jsx: { MetaNavBar } };

//exports

module.exports = NavBar;
