"use strict";

//global imports

const DeleteButton = require("components/delete-button");

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//sidebar

const Sidebar = (props) => {

  const { actions: { metaSetLoading }, data: { user } } = props;

  //utilities

  const auth = user.type === "auth";

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

        const handleClick = () => {

          metaSetLoading(true);

          location.assign(`/auth/${id}`);

        };

        return bool && (
          <button
            className={`c-ui__sidebar-item qa-auth-${id} ${mod}`}
            key={keyGen(id)}
            onClick={handleClick}
          >
            {text}
          </button>
        );

      })}
      {auth && <DeleteButton {...props} root="/voting-app" />}
    </div>
  );

};

//exports

module.exports = Sidebar;
