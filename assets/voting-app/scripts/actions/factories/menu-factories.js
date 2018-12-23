"use strict";

//menu open form

const menuOpenForm = () => ({ type: "MENU_OPEN_FORM" });

//menu set filter

const menuSetFilter = (filter) => ({
  type: "MENU_SET_FILTER",
  filter
});

//exports

module.exports = {
  menuOpenForm,
  menuSetFilter
};
