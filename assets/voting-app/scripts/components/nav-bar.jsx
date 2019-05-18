"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//nav bar

const NavBar = (props) => {

  const { actions: { listSetFilter, metaOpenForm }, data: { user }, history } = props;

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

    e.push(() => {
      listSetFilter(id, history);
    });

  }

  items.push(["form", "New Poll", auth, () => {
    metaOpenForm(history);
  }]);

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-ui__nav-bar">
      {items.map((e) => {

        const [id, text, bool, handleClick] = e;

        return bool && (
          <h3
            className={`c-ui__nav-item qa-nav-${id} u-hover`}
            key={keyGen(id)}
            onClick={handleClick}
          >
            {text}
          </h3>
        );

      })}
    </div>
  );

};

//exports

module.exports = NavBar;
