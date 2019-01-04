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

//menu set filter

const menuSetFilter = (filter) => (dispatch, getState) => {

  const { list } = getState();

  const merge = {
    filter,
    index: 0
  };

  const body = { list: deepCopy(list, merge) };

  const success = (res) => {

    const { polls } = res;

    dispatch(metaSetState({
      polls,
      list: merge
    }));

  };

  return reduxAPICall(dispatch, "/api/menu-set-filter", body, success);

};

//exports

module.exports = {
  menuGetUser,
  menuSetFilter
};
