"use strict";

//global imports

const { metaSetState } = require("redux-utils/meta-factories");
const { newState } = require("schemas/voting-app");
const { deepCopy } = require("utilities");

//menu open form

const menuOpenForm = (history) => (dispatch) => {

  dispatch(metaSetState({ form: newState().form }));

  history.push("/voting-app/form");

};

//menu set filter

const menuSetFilter = (filter, history) => (dispatch) => {

  dispatch(metaSetState({ list: deepCopy(newState().list, { filter }) }));

  history.push("/voting-app/list");

};

//exports

module.exports = {
  menuOpenForm,
  menuSetFilter
};
