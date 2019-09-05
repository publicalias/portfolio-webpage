"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//meta create poll

const metaCreatePoll = (data) => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/meta-create-poll",
  method: "POST",
  data
});

//meta delete poll

const metaDeletePoll = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/meta-delete-poll",
  method: "DELETE",
  data: { id }
});

//meta get polls

const metaGetPolls = (params, id, length) => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/meta-get-polls",
  method: "GET",
  data: {
    params,
    id,
    length
  }
});

//meta get user

const metaGetUser = () => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/meta-get-user",
  method: "GET"
});

//exports

module.exports = {
  metaCreatePoll,
  metaDeletePoll,
  metaGetPolls,
  metaGetUser
};
