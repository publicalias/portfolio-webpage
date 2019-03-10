"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");

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
  listToggleFlag,
  listToggleHide
};
