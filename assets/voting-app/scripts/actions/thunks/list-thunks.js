"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaAddErrors, metaSetState } = require("../factories/meta-factories");

//global imports

const { deepCopy } = require("utilities");

//list set sort

const listSetSort = (sort) => (dispatch, getState) => {

  const { list } = getState();

  const merge = {
    sort,
    index: 0
  };

  const args = {
    path: "/api/list-set-sort",
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

//list submit search

const listSubmitSearch = () => (dispatch, getState) => {

  const { list } = getState();

  const merge = {
    search: "",
    searched: list.search,
    index: 0
  };

  const args = {
    path: "/api/list-submit-search",
    method: "GET",
    data: { list: deepCopy(list, merge) }
  };

  const success = (res) => {

    const { polls, errors } = res;

    dispatch(errors ? metaAddErrors(errors) : metaSetState({
      polls,
      list: merge
    }));

  };

  return reduxAPICall(dispatch, args, success);

};

//list toggle flag

const listToggleFlag = (id) => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/api/list-toggle-flag",
    method: "PATCH",
    data: {
      poll: id,
      list
    }
  };

  return reduxAPICall(dispatch, args);

};

//list toggle hide

const listToggleHide = (id) => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/api/list-toggle-hide",
    method: "PATCH",
    data: {
      poll: id,
      list
    }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = {
  listSetSort,
  listSubmitSearch,
  listToggleFlag,
  listToggleHide
};
