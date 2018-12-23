"use strict";

//local imports

const { metaAddErrors, metaSetState } = require("./meta-actions");
const { initialState } = require("../reducer/reducer");

//global imports

const { initDeepCopy, getJSON } = require("utilities");

const deepCopy = initDeepCopy();

//form add option

const formAddOption = () => (dispatch, getState) => {

  const { form, user } = getState();

  const empty = !form.add.trim();
  const duplicate = form.options.filter((e) => e.text === form.add).length;

  if (empty) {
    dispatch(metaAddErrors(["Option must be valid"]));
  } else if (duplicate) {
    dispatch(metaAddErrors(["Option must be unique"]));
  } else {
    dispatch(metaSetState({
      form: {
        options: form.options.concat([{
          text: form.add,
          created: user.id,
          voted: []
        }]),
        add: ""
      }
    }));
  }

};

//form create poll

const formCreatePoll = (form) => (dispatch) => {

  const body = {
    method: "POST",
    body: form,
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {

    const { polls, poll, errors } = res;

    dispatch(errors ? metaAddErrors(errors) : metaSetState({
      page: "view",
      polls,
      list: deepCopy(initialState.list, { filter: "created" }),
      form: deepCopy(initialState.form),
      view: { poll }
    }));

  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/create-poll", body)
    .then(success)
    .catch(failure);

};

//form discard poll

const formDiscardPoll = () => ({ type: "FORM_DISCARD_POLL" });

//form remove option

const formRemoveOption = (index) => ({
  type: "FORM_REMOVE_OPTION",
  index
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
  formAddOption,
  formCreatePoll,
  formDiscardPoll,
  formRemoveOption,
  formSetAddText,
  formSetTitleText,
  formToggleConfirm,
  formTogglePrivate
};
