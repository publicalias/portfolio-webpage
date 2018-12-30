"use strict";

//view change poll

const viewChangePoll = (delta) => ({
  type: "VIEW_CHANGE_POLL",
  delta
});

//view set add text

const viewSetAddText = (add) => ({
  type: "VIEW_SET_ADD_TEXT",
  add
});

//view toggle confirm

const viewToggleConfirm = () => ({ type: "VIEW_TOGGLE_CONFIRM" });

//view toggle settings

const viewToggleSettings = () => ({ type: "VIEW_TOGGLE_SETTINGS" });

//exports

module.exports = {
  viewChangePoll,
  viewSetAddText,
  viewToggleConfirm,
  viewToggleSettings
};
