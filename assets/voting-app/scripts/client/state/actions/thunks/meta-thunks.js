"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//meta create poll

const metaCreatePoll = (data) => (dispatch) => {

  const args = {
    path: "/voting-app/api/meta-create-poll",
    method: "POST",
    data
  };

  return reduxAPICall(dispatch, args);

};

//meta delete poll

const metaDeletePoll = (id) => (dispatch) => {

  const args = {
    path: "/voting-app/api/meta-delete-poll",
    method: "DELETE",
    data: { id }
  };

  return reduxAPICall(dispatch, args);

};

//meta get polls

const metaGetPolls = (params, id, length) => (dispatch) => {

  const args = {
    path: "/voting-app/api/meta-get-polls",
    method: "GET",
    data: {
      params,
      id,
      length
    }
  };

  return reduxAPICall(dispatch, args);

};

//meta get user

const metaGetUser = () => (dispatch) => {

  const args = {
    path: "/voting-app/api/meta-get-user",
    method: "GET"
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = {
  metaCreatePoll,
  metaDeletePoll,
  metaGetPolls,
  metaGetUser
};
