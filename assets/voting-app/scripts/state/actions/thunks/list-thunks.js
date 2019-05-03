"use strict";

//global imports

const { reduxAPICall } = require("redux-utils/client-utils");
const { metaSetState } = require("redux-utils/meta-factories");
const { newState } = require("schemas/voting-app");

//list open view

const listOpenView = (id, history) => (dispatch) => {

  dispatch(metaSetState({ view: newState().view }));

  history.push(`/voting-app/view?id=${id}`);

};

//list toggle flag

const listToggleFlag = (id) => (dispatch) => {

  const args = {
    path: "/voting-app/api/list-toggle-flag",
    method: "PATCH",
    data: { id }
  };

  return reduxAPICall(dispatch, args);

};

//list toggle hide

const listToggleHide = (id) => (dispatch) => {

  const args = {
    path: "/voting-app/api/list-toggle-hide",
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
