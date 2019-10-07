"use strict";

/*eslint react/no-multi-comp: 0*/

//global imports

const { encodeAPICall } = require("all/client-utils");
const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//auth buttons

const DeleteButton = (props) => {

  const {
    actions: { metaAddErrors, metaSetLoading, metaToggleDelete },
    data: { account },
    local: { redirect }
  } = props;

  //events

  const handleToggle = () => {
    metaToggleDelete();
  };

  const handleDelete = async () => {

    const { path, init } = encodeAPICall({
      path: "/auth/delete",
      method: "DELETE"
    });

    metaSetLoading(true);

    const res = await fetch(path, init);

    if (res.ok) {
      location.assign(redirect);
    } else {
      metaAddErrors([`${res.status} ${res.statusText}`]);
      metaSetLoading();
    }

  };

  //render

  return account.delete ? (
    <React.Fragment>
      <p className="c-auth-buttons__dialog">This will delete your account and any data associated with it, including any content you have created and any interactions with other users' content. It will be like you never existed. Are you sure you want to do this?</p>
      <div className="c-auth-buttons__choice-box">
        <button className="c-auth-buttons__choice u-margin-right" onClick={handleDelete}>Yes</button>
        <button className="c-auth-buttons__choice" onClick={handleToggle}>No</button>
      </div>
    </React.Fragment>
  ) : <button className="c-auth-buttons__button u-margin-none" onClick={handleToggle}>Delete My Account</button>;

};

DeleteButton.propList = ["data.account", "local"];

const AuthButtons = (props) => {

  const { actions: { metaSetLoading }, data: { user }, local: { redirect } } = props;

  const { jsx: { DeleteButton } } = AuthButtons.injected;

  //utilities

  const auth = user.type === "auth";

  const list = auth ? [
    ["logout", "Logout"],
    ["delete", null, null, DeleteButton]
  ] : [
    ["facebook", "Facebook Login"],
    ["github", "GitHub Login"],
    ["twitter", "Twitter Login", "u-margin-none"]
  ];

  //events

  const handleClick = (id) => () => {

    metaSetLoading(true);

    location.assign(`/auth/${id}?redirect=${redirect}`);

  };

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-auth-buttons">
      {list.map((e) => {

        const [id, text, util = "", Component] = e;

        return Component ? <Component {...props} key={keyGen(id)} /> : (
          <button
            className={`c-auth-buttons__button ${util}`}
            key={keyGen(id)}
            onClick={handleClick(id)}
          >
            {text}
          </button>
        );

      })}
    </div>
  );

};

AuthButtons.propList = ["data.user", "local"];

AuthButtons.injected = { jsx: { DeleteButton } };

//exports

module.exports = AuthButtons;
