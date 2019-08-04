"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");

//node modules

const React = require("react");

//view settings

const ViewSettings = (props) => {

  const {
    actions: { metaAddErrors, metaDeletePoll, pollToggleSecret, viewToggleDelete },
    data: { view },
    history,
    local: { poll }
  } = props;

  //events

  const handleConfirm = () => {
    viewToggleDelete();
  };

  const handleDelete = async () => {

    const res = await metaDeletePoll(poll.id);

    if (res && !res.errors) {
      history.push("/list?filter=created");
    }

  };

  const handleSecret = () => {
    if (poll.users.flagged.length >= 5) {
      metaAddErrors(["Poll has been flagged too many times"]);
    } else {
      handleReload(() => pollToggleSecret(poll.id), props);
    }
  };

  //render

  return (
    <div className="c-view-menu__display-box u-flex-1">
      {view.delete ? (
        <div className="c-view-menu__display-box">
          <p className="c-view-menu__confirm-text">Are you sure?</p>
          <button className="c-view-menu__control-btn qa-delete-poll" onClick={handleDelete}>Yes</button>
          <button className="c-view-menu__control-btn qa-confirm-false" onClick={handleConfirm}>No</button>
        </div>
      ) : <button className="c-view-menu__control-btn qa-confirm-true" onClick={handleConfirm}>Delete</button>}
      <button
        className="c-view-menu__toggle-btn qa-toggle-secret u-flex-right"
        onClick={handleSecret}
      >
        {poll.secret || poll.users.flagged.length >= 5 ? "Private" : "Public"}
      </button>
    </div>
  );

};

ViewSettings.propList = ["data.view", "local"];

//exports

module.exports = ViewSettings;
