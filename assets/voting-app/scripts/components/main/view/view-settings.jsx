"use strict";

//local imports

const { handleReload } = require("../../../event-handlers");

//node modules

const React = require("react");

//view settings

const ViewSettings = (props) => {

  const {
    actions: { metaDeletePoll, pollToggleSecret, viewToggleConfirm },
    data: { view },
    history,
    local: { poll }
  } = props;

  //events

  const handleConfirm = () => {
    viewToggleConfirm();
  };

  const handleDelete = async () => {

    const res = await metaDeletePoll(poll.id);

    if (res && !res.errors) {
      history.push("/list?filter=created");
    }

  };

  const handleSecret = () => {
    handleReload(() => pollToggleSecret(poll.id), props);
  };

  //render

  return (
    <div className="c-view-menu__display-box u-flex-1">
      {view.confirm ? (
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
        {poll.secret ? "Private" : "Public"}
      </button>
    </div>
  );

};

//exports

module.exports = ViewSettings;
