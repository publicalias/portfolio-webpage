"use strict";

//local imports

const { initialState } = require("./reducer");

//global imports

const { deepMerge, getJSON } = require("utilities");

//meta set state

const metaSetState = (merge) => ({
  type: "META_SET_STATE",
  merge
});

//menu auth user

const menuAuthUser = (type, auth) => (dispatch) => {

  const getState = (user) => deepMerge(initialState, user);

  const body = {
    method: "POST",
    body: auth,
    headers: new Headers({ "Content-Type": "application/json" })
  };

  return getJSON(`/api/auth?type=${type}`, body)
    .then((res) => dispatch(metaSetState(getState(res))))
    .catch(() => dispatch(metaSetState(getState({}))));

};

//menu open form

const menuOpenForm = () => ({ type: "MENU_OPEN_FORM" });

//menu set filter

const menuSetFilter = (filter) => (dispatch) => {

  const getState = (polls) => ({
    page: "list",
    list: {
      filter,
      search: "",
      sort: "new",
      polls
    }
  });

  return getJSON(`/api/list?filter=${filter}`)
    .then((res) => dispatch(metaSetState(getState(res))))
    .catch(() => dispatch(metaSetState(getState([]))));

};

//exports

module.exports = {
  menuAuthUser,
  menuOpenForm,
  menuSetFilter,
  metaSetState
};
