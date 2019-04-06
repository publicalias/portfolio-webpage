"use strict";

//form discard poll

const formDiscardPoll = () => ({ type: "FORM_DISCARD_POLL" });

//form remove option

const formRemoveOption = (text) => ({
  type: "FORM_REMOVE_OPTION",
  text
});

//form set add text

const formSetAddText = (add) => ({
  type: "FORM_SET_ADD_TEXT",
  add
});

//form set title text

const formSetTitleText = (title) => ({
  type: "FORM_SET_TITLE_TEXT",
  title
});

//form toggle confirm

const formToggleConfirm = () => ({ type: "FORM_TOGGLE_CONFIRM" });

//form toggle private

const formTogglePrivate = () => ({ type: "FORM_TOGGLE_PRIVATE" });

//exports

module.exports = {
  formDiscardPoll,
  formRemoveOption,
  formSetAddText,
  formSetTitleText,
  formToggleConfirm,
  formTogglePrivate
};
