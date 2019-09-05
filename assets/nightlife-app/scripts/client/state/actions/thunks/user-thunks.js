"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//user get data

const userGetData = (params, id, length) => (dispatch) => {

  const args = {
    path: "/nightlife-app/api/user-get-data",
    method: "GET",
    data: {
      params,
      id,
      length
    }
  };

  return reduxAPICall(dispatch, args);

};

//user toggle block

const userToggleBlock = (id) => (dispatch) => {

  const args = {
    path: "/nightlife-app/api/user-toggle-block",
    method: "PATCH",
    data: { id }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = {
  userGetData,
  userToggleBlock
};
