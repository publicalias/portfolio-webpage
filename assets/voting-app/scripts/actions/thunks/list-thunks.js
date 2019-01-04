"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaAddErrors, metaSetState } = require("../factories/meta-factories");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//list set sort

const listSetSort = (sort) => (dispatch, getState) => {

  const { list } = getState();

  const merge = {
    sort,
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

  return reduxAPICall(dispatch, "/api/list-set-sort", body, success);

};

//list submit search

const listSubmitSearch = () => (dispatch, getState) => {

  const { list } = getState();

  const merge = {
    search: "",
    searched: list.search,
    index: 0
  };

  const body = { list: deepCopy(list, merge) };

  const success = (res) => {

    const { polls, errors } = res;

    dispatch(errors ? metaAddErrors(errors) : metaSetState({
      polls,
      list: merge
    }));

  };

  return reduxAPICall(dispatch, "/api/list-submit-search", body, success);

};

//list toggle flag

const listToggleFlag = (id) => (dispatch, getState) => {

  const { list } = getState();

  const body = {
    poll: id,
    list
  };

  return reduxAPICall(dispatch, "/api/list-toggle-flag", body);

};

//list toggle hide

const listToggleHide = (id) => (dispatch, getState) => {

  const { list } = getState();

  const body = {
    poll: id,
    list
  };

  return reduxAPICall(dispatch, "/api/list-toggle-hide", body);

};

//exports

module.exports = {
  listSetSort,
  listSubmitSearch,
  listToggleFlag,
  listToggleHide
};
