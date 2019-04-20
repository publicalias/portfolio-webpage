"use strict";

//menu set filter

const menuSetFilter = (filter) => ({
  type: "MENU_SET_FILTER",
  filter
});

//menu toggle confirm

const menuToggleConfirm = () => ({ type: "MENU_TOGGLE_CONFIRM" });

//exports

module.exports = {
  menuSetFilter,
  menuToggleConfirm
};
