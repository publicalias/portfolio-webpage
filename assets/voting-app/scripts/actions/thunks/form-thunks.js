"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaAddErrors, metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//global imports

const { checkErrors, deepCopy } = require("utilities");

//node modules

const { regex: obscenities } = require("badwords-list");

//form add option

const formAddOption = () => (dispatch, getState) => {

  const { user, form } = getState();

  const errors = checkErrors([{
    bool: !form.add.trim(),
    text: "Option must not be empty"
  }, {
    bool: form.options.filter((e) => e.text === form.add).length,
    text: "Option must be unique"
  }, {
    bool: obscenities.test(form.add),
    text: "Option must not be obscene"
  }]);

  if (errors.length) {
    dispatch(metaAddErrors(errors)); //not foolproof
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

  const args = {
    path: "/api/form-create-poll",
    method: "POST",
    data: {
      list,
      form
    }
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

  return reduxAPICall(dispatch, args, success);

};

//exports

module.exports = {
  formAddOption,
  formCreatePoll
};
