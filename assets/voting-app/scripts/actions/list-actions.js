"use strict";

//local imports

const { metaAddErrors, metaSetState } = require("./meta-actions");

//global imports

const { getJSON } = require("utilities");

//list get results

const listGetResults = () => ({ type: "LIST_GET_RESULTS" });

//list load polls

const listLoadPolls = (load) => ({
  type: "LIST_LOAD_POLLS",
  load
});

//list open view

const listOpenView = (index) => ({
  type: "LIST_OPEN_VIEW",
  index
});

//list set search text

const listSetSearchText = (search) => ({
  type: "LIST_SET_SEARCH_TEXT",
  search
});

//list set sort

const listSetSort = (sort) => ({
  type: "LIST_SET_SORT",
  sort
});

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

const listToggleFlag = (index) => (dispatch, getState) => {

  const { list, user } = getState();

  const body = {
    method: "POST",
    body: {
      userID: user.id,
      pollID: list.loaded[index].id
    },
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

const listToggleHide = (index) => (dispatch, getState) => {

  const { list, user } = getState();

  const body = {
    method: "POST",
    body: {
      userID: user.id,
      pollID: list.loaded[index].id
    },
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
  listGetResults,
  listLoadPolls,
  listOpenView,
  listSetSearchText,
  listSetSort,
  listSubmitSearch,
  listToggleFlag,
  listToggleHide
};
