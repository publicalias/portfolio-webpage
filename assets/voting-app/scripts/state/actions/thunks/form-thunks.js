"use strict";

//global imports

const { reduxAPICall } = require("redux-utils/client-utils");
const { metaAddErrors, metaSetState } = require("redux-utils/meta-factories");
const { newState } = require("schemas/voting-app");
const { deepCopy } = require("utilities");

//form create poll

const formCreatePoll = (history) => (dispatch, getState) => {

  const { form } = getState();

  const args = {
    path: "/voting-app/api/form-create-poll",
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

    history.push(`/view?id=${id}`);

  };

  return reduxAPICall(dispatch, args, success);

};

//exports

module.exports = { formCreatePoll };
