"use strict";

//menu open form

const menuOpenForm = () => ({ type: "MENU_OPEN_FORM" });

//menu set filter

const menuSetFilter = (filter) => ({
  type: "MENU_SET_FILTER",
  filter
});

//menu toggle confirm

const menuToggleConfirm = () => ({ type: "MENU_TOGGLE_CONFIRM" });

//exports

module.exports = {
  menuOpenForm,
  menuSetFilter,
  menuToggleConfirm
};
