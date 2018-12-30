"use strict";

//local imports

const { metaAddErrors, metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

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
    body: { form },
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {

    const { polls, errors } = res;

    dispatch(errors ? metaAddErrors(errors) : metaSetState({
      page: "view",
      polls,
      list: deepCopy(initialState.list, { filter: "created" }),
      form: deepCopy(initialState.form)
    }));

  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/create-poll", body)
    .then(success)
    .catch(failure);

};

//exports

module.exports = {
  formAddOption,
  formCreatePoll
};
