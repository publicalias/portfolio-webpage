"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");

//meta get polls

const metaGetPolls = (poll, skip = false) => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/api/meta-get-polls",
    method: "GET",
    data: {
      poll,
      skip,
      list
    }
  };

  return reduxAPICall(dispatch, args);

};

//meta get user

const metaGetUser = () => (dispatch) => {

  const args = {
    path: "/api/meta-get-user",
    method: "GET"
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = {
  metaGetPolls,
  metaGetUser
};
