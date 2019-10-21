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

  return <MetaNavBar local={{ list }} />;

};

NavBar.propList = ["data.user"];

NavBar.injected = { jsx: { MetaNavBar } };

//exports

module.exports = NavBar;
