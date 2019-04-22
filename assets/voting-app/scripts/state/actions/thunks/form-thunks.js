"use strict";

//local imports

const { reduxAPICall } = require("../../../app-logic");
const { metaAddErrors, metaSetState } = require("../factories/meta-factories");

//global imports

const { newState } = require("schemas/voting-app");
const { checkErrors, deepCopy } = require("utilities");

//node modules

const { regex: obscene } = require("badwords-list");

//form add option

const formAddOption = () => (dispatch, getState) => {

  const { form } = getState();

  const errors = checkErrors([{
    bool: !form.add.trim(),
    text: "Option must not be empty"
  }, {
    bool: form.options.filter((e) => e === form.add).length,
    text: "Option must be unique"
  }, {
    bool: obscene.test(form.add),
    text: "Option must not be obscene"
  }]);

  if (errors.length) {
    dispatch(metaAddErrors(errors));
  } else {
    dispatch(metaSetState({
      form: {
        options: form.options.concat(form.add),
        add: ""
      }
    }));
  }

};

//form create poll

const formCreatePoll = (history) => (dispatch, getState) => {

  const { form } = getState();

  const args = {
    path: "/api/form-create-poll",
    method: "POST",
    data: { form }
  };

  const success = (res) => {

    const { list, form, view } = newState();

    const { id, errors } = res;

    if (errors) {

      dispatch(metaAddErrors(errors));

      return;

    }

    dispatch(metaSetState({
      list: deepCopy(list, { filter: "created" }),
      form: deepCopy(form),
      view: deepCopy(view)
    }));

    history.push(`/voting-app/view/${id}`);

  };

  return reduxAPICall(dispatch, args, success);

};

//exports

module.exports = {
  formAddOption,
  formCreatePoll
};
