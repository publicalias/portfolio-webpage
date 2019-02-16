"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaSetState } = require("../factories/meta-factories");

//global imports

const { deepCopy } = require("utilities");

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

module.exports = { menuSetFilter };
