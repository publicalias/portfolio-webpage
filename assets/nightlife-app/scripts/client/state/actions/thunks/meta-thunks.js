"use strict";

//local imports

const { newUserData } = require("../../../../../schemas");

//global imports

const { reduxAPICall } = require("redux/client-utils");

//meta add app data

const metaAddAppData = () => (dispatch) => {

  const args = {
    path: "/nightlife-app/api/meta-add-app-data",
    method: "PATCH",
    data: newUserData()
  };

  return reduxAPICall(dispatch, args);

};

//meta get user

const metaGetUser = () => (dispatch) => {

  const args = {
    path: "/nightlife-app/api/meta-get-user",
    method: "GET"
  };

  return reduxAPICall(dispatch, args);

};

//meta save avatar

const metaSaveAvatar = (avatar) => (dispatch) => {

  const args = {
    path: "/nightlife-app/api/meta-save-avatar",
    method: "PATCH",
    data: { avatar }
  };

  return reduxAPICall(dispatch, args);

};

//meta save zip code

const metaSaveZipCode = (zipCode) => (dispatch) => {

  const args = {
    path: "/nightlife-app/api/meta-save-zip-code",
    method: "PATCH",
    data: { zipCode }
  };

  return reduxAPICall(dispatch, args);

};

module.exports = {
  metaAddAppData,
  metaGetUser,
  metaSaveAvatar,
  metaSaveZipCode
};
