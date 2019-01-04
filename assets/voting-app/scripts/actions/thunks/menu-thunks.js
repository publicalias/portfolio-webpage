"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//menu get user

const menuGetUser = (type) => (dispatch) => {

  const success = (res) => {

    const merge = deepCopy(initialState, res);

    delete merge.polls;
    delete merge.errors;

    dispatch(metaSetState(merge, { object: true }));

  };

  return reduxAPICall(dispatch, "/api/menu-get-user", { type }, success);

};

//exports

module.exports = { menuGetUser };
