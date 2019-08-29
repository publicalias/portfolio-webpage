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
    ["all", "All Polls", true],
    ["created", "My Polls", auth],
    ["voted", "Voted", true],
    ["hidden", "Hidden", true],
    ["form", "New Poll", auth, "/form", "u-flex-right"]
  ];

  for (const e of list) {
    if (!e[3]) {
      e[3] = `/list?filter=${e[0]}`;
    }
  }

  //render

  return <NavBar local={{ list }} />;

};

WrapNavBar.propList = ["data.user"];

WrapNavBar.injected = { jsx: { NavBar } };

//exports

module.exports = WrapNavBar;
