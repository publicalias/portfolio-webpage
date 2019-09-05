"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//user get data

const userGetData = (params, id, length) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/user-get-data",
  method: "GET",
  data: {
    params,
    id,
    length
  }
});

//user toggle block

const userToggleBlock = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/user-toggle-block",
  method: "PATCH",
  data: { id }
});

//exports

module.exports = {
  userGetData,
  userToggleBlock
};
