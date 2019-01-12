"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaAddErrors, metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//form add option

const formAddOption = () => (dispatch, getState) => {

  const { user, form } = getState();

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

const formCreatePoll = () => (dispatch, getState) => {

  const { list, form } = getState();

  const body = {
    list,
    form
  };

  const success = (res) => {

    const { polls, poll, errors } = res;

    dispatch(errors ? metaAddErrors(errors) : metaSetState({
      page: "view",
      polls,
      list: deepCopy(initialState.list, { filter: "created" }),
      form: deepCopy(initialState.form),
      view: deepCopy(initialState.view, { poll })
    }));

  };

  return reduxAPICall(dispatch, "/api/form-create-poll", body, success);

};

//exports

module.exports = {
  formAddOption,
  formCreatePoll
};
