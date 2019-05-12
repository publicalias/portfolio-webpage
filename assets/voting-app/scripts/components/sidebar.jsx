"use strict";

//global imports

const DeleteButton = require("components/delete-button");

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//sidebar

const Sidebar = (props) => {

  const { data: { user } } = props;

  //utilities

  const auth = user.auth && !user.data.restricted;

  const items = [
    ["facebook", "Facebook Login", !auth],
    ["github", "GitHub Login", !auth],
    ["twitter", "Twitter Login", !auth, "u-no-margin"],
    ["logout", "Logout", auth]
  ];

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-ui__sidebar">
      <p>{`Hi, ${user.name || "Anonymous"}!`}</p>
      <hr />
      {items.map((e) => {

        const [id, text, bool, mod = ""] = e;

        return bool && (
          <a href={`/auth/${id}`} key={keyGen(id)}>
            <button className={`c-ui__sidebar-item ${mod}`}>{text}</button>
          </a>
        );

      })}
      {auth && <DeleteButton />}
    </div>
  );

};

//exports

module.exports = Sidebar;
