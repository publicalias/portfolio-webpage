"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//nav bar

const NavBar = (props) => {

  const { data: { user } } = props;

  //utilities

  const auth = user.auth && !user.data.restricted;

  const items = [
    ["all", "All Polls", true],
    ["created", "My Polls", auth],
    ["voted", "Voted", true],
    ["hidden", "Hidden", true]
  ];

  for (const e of items) {

    const [id] = e;

    e.push(`/list?filter=${id}`);

  }

  items.push(["form", "New Poll", auth, "/form"]);

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-ui__nav-bar">
      {items.map((e) => {

        const [id, text, bool, link] = e;

        return bool && (
          <Link key={keyGen(id)} to={link}>
            <h3 className="c-ui__nav-item u-hover">{text}</h3>
          </Link>
        );

      })}
    </div>
  );

};

//exports

module.exports = NavBar;
