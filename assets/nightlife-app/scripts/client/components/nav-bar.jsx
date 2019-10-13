"use strict";

//global imports

const NavBar = require("redux/components/nav-bar");

//node modules

const React = require("react");

//wrap nav bar

const WrapNavBar = (props) => {

  const { data: { user } } = props;

  const { jsx: { NavBar } } = WrapNavBar.injected;

  //utilities

  const auth = user.type === "auth";

  const list = [
    ["venues", "Venues", true, "/venues/list"],
    ["users", "Users", true, "/users/list"],
    ["my-page", "My Page", auth, `/users/page/${user.id}`, "u-flex-right"]
  ];

  //render

  return <NavBar local={{ list }} />;

};

WrapNavBar.propList = ["data.user"];

WrapNavBar.injected = { jsx: { NavBar } };

//exports

module.exports = WrapNavBar;
