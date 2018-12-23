"use strict";

//local imports

const { metaAddErrors, metaSetState } = require("./meta-actions");
const { initialState } = require("../reducer/reducer");

//global imports

const { initDeepCopy, getJSON } = require("utilities");

const deepCopy = initDeepCopy();

//menu auth user

const menuAuthUser = (type, auth) => (dispatch) => {

  const body = {
    method: "POST",
    body: auth,
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {

    const merge = deepCopy(initialState, res);

    delete merge.polls;
    delete merge.errors;

    dispatch(metaSetState(merge, { object: true }));

  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON(`/api/auth-user?type=${type}`, body)
    .then(success)
    .catch(failure);

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
