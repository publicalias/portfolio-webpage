"use strict";

//local imports

const { metaAddErrors, metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//global imports

const { initDeepCopy, getJSON } = require("utilities");

const deepCopy = initDeepCopy();

//menu auth user

const menuAuthUser = (type, auth) => (dispatch) => {

  const body = {
    method: "POST",
    body: {
      type,
      auth
    },
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {

    const merge = deepCopy(initialState, res);

    delete merge.polls;
    delete merge.errors;

    dispatch(metaSetState(merge, { object: true }));

  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/auth-user", body)
    .then(success)
    .catch(failure);

};

//exports

module.exports = { menuAuthUser };
