"use strict";

//global imports

const { reduxAPICall } = require("redux-utils/client-utils");

//meta get polls

const metaGetPolls = (id, skip = false) => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/api/meta-get-polls",
    method: "GET",
    data: {
      id,
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
