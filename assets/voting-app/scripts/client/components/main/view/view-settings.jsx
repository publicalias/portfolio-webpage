"use strict";

//node modules

const React = require("react");

//view settings

const ViewSettings = (props) => {

  const {
    actions: { metaDeletePoll, pollToggleSecret, viewToggleDelete },
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
    pollToggleSecret(poll.id);
  };

  //render

  return (
    <div className="c-view-menu__display-box u-flex-1">
      {view.delete ? (
        <div className="c-view-menu__display-box">
          <p className="c-view-menu__confirm-text">Are you sure?</p>
          <button className="c-view-menu__control-btn qa-click-yes" onClick={handleDelete}>Yes</button>
          <button className="c-view-menu__control-btn qa-click-no" onClick={handleConfirm}>No</button>
        </div>
      ) : <button className="c-view-menu__control-btn qa-click-delete" onClick={handleConfirm}>Delete</button>}
      <button
        className="c-view-menu__button qa-toggle-secret u-flex-right"
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
