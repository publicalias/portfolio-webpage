"use strict";

//local imports

const { reduxAPICall } = require("../../../app-logic");
const { metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//list open view

const listOpenView = (id, history) => (dispatch) => {

  dispatch(metaSetState({ view: initialState.view }));

  history.push(`/voting-app/view/${id}`);

};

//list toggle flag

const listToggleFlag = (id) => (dispatch) => {

  const args = {
    path: "/api/list-toggle-flag",
    method: "PATCH",
    data: { id }
  };

  return reduxAPICall(dispatch, args);

};

//list toggle hide

const listToggleHide = (id) => (dispatch) => {

  const args = {
    path: "/api/list-toggle-hide",
    method: "PATCH",
    data: { id }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = {
  listOpenView,
  listToggleFlag,
  listToggleHide
};
