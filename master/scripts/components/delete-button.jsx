"use strict";

//local imports

const { encodeAPICall } = require("../client-utils");
const { useSetState } = require("../react-utils");

//node modules

const React = require("react");

//delete button

const DeleteButton = () => {

  //state

  const [state, setState] = useSetState({ confirm: false });

  //events

  const handleToggle = () => {
    setState({ confirm: !state.confirm });
  };

  const handleDelete = () => {

    const { path, init } = encodeAPICall({
      path: "/auth/delete",
      method: "DELETE"
    });

    fetch(path, init).then(() => {
      location.reload();
    });

  };

  //render

  return (
    <div className="c-delete-button">
      {state.confirm ? (
        <div>
          <p className="c-delete-button__dialog">This will delete your account and any data associated with it, including any content you have created and any interactions with other users' content. It will be like you never existed. Are you sure you want to do this?</p>
          <div className="c-delete-button__choice-box">
            <button className="c-delete-button__choice u-margin-right" onClick={handleDelete}>Yes</button>
            <button className="c-delete-button__choice" onClick={handleToggle}>No</button>
          </div>
        </div>
      ) : <button className="c-delete-button__button" onClick={handleToggle}>Delete My Account</button>}
    </div>
  );

};

//exports

module.exports = DeleteButton;
