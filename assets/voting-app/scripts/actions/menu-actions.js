"use strict";

//local imports

const { metaSetState } = require("./meta-actions");
const { initialState } = require("../reducer/reducer");

//global imports

const { deepCopy, getJSON } = require("utilities");

//menu auth user

const menuAuthUser = (type, auth) => (dispatch) => {

  const getState = (user = { user: {} }) => deepCopy(initialState, user);

  const options = { shallow: true };

  const body = {
    method: "POST",
    body: auth,
    headers: new Headers({ "Content-Type": "application/json" })
  };

  return getJSON(`/api/auth?type=${type}`, body)
    .then((res) => dispatch(metaSetState(getState(res), options)))
    .catch(() => dispatch(metaSetState(getState({}), options)));

};

//menu open form

const menuOpenForm = () => ({ type: "MENU_OPEN_FORM" });

//menu set filter

const menuSetFilter = (filter) => ({
  type: "MENU_SET_FILTER",
  filter
});

//exports

module.exports = {
  menuAuthUser,
  menuOpenForm,
  menuSetFilter
};
