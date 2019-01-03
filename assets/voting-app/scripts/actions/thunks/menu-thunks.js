"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//menu auth user

const menuAuthUser = (type, auth) => (dispatch) => {

  const body = {
    type,
    auth
  };

  const success = (res) => {

    const merge = deepCopy(initialState, res);

    delete merge.polls;
    delete merge.errors;

    dispatch(metaSetState(merge, { object: true }));

  };

  return reduxAPICall(dispatch, "/api/menu-auth-user", body, success);

};

//exports

module.exports = { menuAuthUser };
