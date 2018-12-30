"use strict";

//local imports

const { metaAddErrors, metaSetState } = require("../factories/meta-factories");

//global imports

const { getJSON } = require("utilities");

//list submit search

const listSubmitSearch = () => (dispatch, getState) => {

  const { list } = getState();

  const empty = !list.search.trim();

  if (empty) {
    dispatch(metaAddErrors(["Nothing will come of nothing"]));
  } else {
    dispatch(metaSetState({
      list: {
        search: "",
        searched: list.search
      }
    }));
  }

};

//list toggle flag

const listToggleFlag = (id) => (dispatch) => {

  const body = {
    method: "POST",
    body: { poll: id },
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {
    dispatch(metaSetState(res));
  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/flag-poll", body)
    .then(success)
    .catch(failure);

};

//list toggle hide

const listToggleHide = (id) => (dispatch) => {

  const body = {
    method: "POST",
    body: { poll: id },
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {
    dispatch(metaSetState(res));
  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/hide-poll", body)
    .then(success)
    .catch(failure);

};

//exports

module.exports = {
  listSubmitSearch,
  listToggleFlag,
  listToggleHide
};
