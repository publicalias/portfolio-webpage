"use strict";

//local imports

const { metaSetState } = require("./meta-actions");
const { initialState } = require("../reducer/reducer");

//global imports

const { deepCopy, getJSON } = require("utilities");

//menu auth user

const menuAuthUser = (type, auth) => (dispatch) => {

  const getState = (user) => deepCopy(initialState, user);

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
  menuSetFilter
};
