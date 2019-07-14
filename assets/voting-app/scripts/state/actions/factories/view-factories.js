"use strict";

//view clear state

const viewClearState = () => ({ type: "VIEW_CLEAR_STATE" });

//view set add

const viewSetAdd = (add) => ({
  type: "VIEW_SET_ADD",
  add
});

//view toggle delete

const viewToggleDelete = () => ({ type: "VIEW_TOGGLE_DELETE" });

//view toggle settings

const viewToggleSettings = () => ({ type: "VIEW_TOGGLE_SETTINGS" });

//exports

module.exports = {
  viewClearState,
  viewSetAdd,
  viewToggleDelete,
  viewToggleSettings
};
