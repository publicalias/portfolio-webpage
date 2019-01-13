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

  const args = {
    path: "/api/menu-get-user",
    method: "GET",
    data: { type }
  };

  const success = (res) => {

    const merge = deepCopy(initialState, res);

    delete merge.polls;
    delete merge.errors;

    dispatch(metaSetState(merge, { object: true }));

  };

  return reduxAPICall(dispatch, args, success);

};

//menu set filter

const menuSetFilter = (filter) => (dispatch, getState) => {

  const { list } = getState();

  const merge = {
    filter,
    index: 0
  };

  const args = {
    path: "/api/menu-set-filter",
    method: "GET",
    data: { list: deepCopy(list, merge) }
  };

  const success = (res) => {

    const { polls } = res;

    dispatch(metaSetState({
      polls,
      list: merge
    }));

  };

  return reduxAPICall(dispatch, args, success);

};

//exports

module.exports = {
  menuGetUser,
  menuSetFilter
};
