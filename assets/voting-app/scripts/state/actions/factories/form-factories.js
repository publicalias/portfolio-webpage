"use strict";

//form add option

const formAddOption = () => ({ type: "FORM_ADD_OPTION" });

//form discard poll

const formDiscardPoll = () => ({ type: "FORM_DISCARD_POLL" });

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

//form toggle confirm

const formToggleConfirm = () => ({ type: "FORM_TOGGLE_CONFIRM" });

//form toggle secret

const formToggleSecret = () => ({ type: "FORM_TOGGLE_SECRET" });

//exports

module.exports = {
  formAddOption,
  formDiscardPoll,
  formRemoveOption,
  formSetAdd,
  formSetTitle,
  formToggleConfirm,
  formToggleSecret
};
