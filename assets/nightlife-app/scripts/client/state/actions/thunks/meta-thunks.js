"use strict";

//local imports

const { newUserData } = require("../../../../../schemas");

//global imports

const { reduxAPICall } = require("redux/client-utils");

//meta add app data

const metaAddAppData = () => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/meta-add-app-data",
  method: "PATCH",
  data: newUserData()
});

//meta get user

const metaGetUser = () => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/meta-get-user",
  method: "GET"
});

//meta save avatar

const metaSaveAvatar = (avatar) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/meta-save-avatar",
  method: "PATCH",
  data: { avatar }
});

//meta save zip code

const metaSaveZipCode = (zipCode) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/meta-save-zip-code",
  method: "PATCH",
  data: { zipCode }
});

//exports

module.exports = {
  metaAddAppData,
  metaGetUser,
  metaSaveAvatar,
  metaSaveZipCode
};
