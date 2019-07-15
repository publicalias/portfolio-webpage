"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//nav bar

const NavBar = (props) => {

  const { data: { user } } = props;

  const { jsx: { Link } } = NavBar.injected;

  //utilities

  const auth = user.type === "auth";

  const links = [
    ["all", "All Polls", true],
    ["created", "My Polls", auth],
    ["voted", "Voted", true],
    ["hidden", "Hidden", true],
    ["form", "New Poll", auth, "/form", "u-flex-right"]
  ];

  for (const e of links) {
    if (e.length === 3) {
      e.push(`/list?filter=${e[0]}`);
    }
  }

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-ui__nav-bar">
      {links.map((e) => {

        const [id, text, bool, link, util] = e;

        return bool && (
          <div className={util} key={keyGen(id)}>
            <Link to={link}>
              <h3 className="c-ui__nav-item u-hover">{text}</h3>
            </Link>
          </div>
        );

      })}
    </div>
  );

};

NavBar.injected = { jsx: { Link } };

//exports

module.exports = NavBar;
