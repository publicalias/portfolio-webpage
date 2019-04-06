"use strict";

//view open list

const viewOpenList = () => ({ type: "VIEW_OPEN_LIST" });

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
  viewOpenList,
  viewSetAddText,
  viewToggleConfirm,
  viewToggleSettings
};
