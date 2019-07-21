"use strict";

//form add option

const formAddOption = () => ({ type: "FORM_ADD_OPTION" });

//form clear state

const formClearState = () => ({ type: "FORM_CLEAR_STATE" });

//form remove option

const formRemoveOption = (text) => ({
  type: "FORM_REMOVE_OPTION",
  text
});

//form set add

const formSetAdd = (add) => ({
  type: "FORM_SET_ADD",
  add
});

//form set title

const formSetTitle = (title) => ({
  type: "FORM_SET_TITLE",
  title
});

//form toggle delete

const formToggleDelete = () => ({ type: "FORM_TOGGLE_DELETE" });

//form toggle secret

const formToggleSecret = () => ({ type: "FORM_TOGGLE_SECRET" });

//exports

module.exports = {
  formAddOption,
  formClearState,
  formRemoveOption,
  formSetAdd,
  formSetTitle,
  formToggleDelete,
  formToggleSecret
};
