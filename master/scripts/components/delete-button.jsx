"use strict";

//local imports

const { encodeAPICall } = require("../client-utils");
const { useSetState } = require("../react-utils");

//node modules

const React = require("react");

//delete button

const DeleteButton = (props) => {

  const { actions: { metaAddErrors, metaSetLoading }, local: { root } } = props;

  //state

  const [state, setState] = useSetState({ confirm: false });

  //events

  const handleToggle = () => {
    setState({ confirm: !state.confirm });
  };

  const handleDelete = async () => {

    const { path, init } = encodeAPICall({
      path: "/auth/delete",
      method: "DELETE"
    });

    metaSetLoading(true);

    const res = await fetch(path, init);

    if (res.ok) {
      location.assign(root);
    } else {
      metaAddErrors([`${res.status} ${res.statusText}`]);
      metaSetLoading();
    }

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
