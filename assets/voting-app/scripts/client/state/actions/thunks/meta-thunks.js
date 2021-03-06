"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//meta create poll

const metaCreatePoll = (data) => reduxAPICall({
  type: "META_CREATE_POLL",
  path: "/voting-app/api/meta-create-poll",
  method: "POST",
  data
});

//meta delete poll

const metaDeletePoll = (id) => reduxAPICall({
  type: "META_DELETE_POLL",
  path: "/voting-app/api/meta-delete-poll",
  method: "DELETE",
  data: { id }
});

//meta get poll item

const metaGetPollItem = (id) => reduxAPICall({
  type: "META_GET_POLL_ITEM",
  path: "/voting-app/api/meta-get-poll-item",
  method: "GET",
  data: { id }
});

//meta get poll list

const metaGetPollList = (params, length) => reduxAPICall({
  type: "META_GET_POLL_LIST",
  path: "/voting-app/api/meta-get-poll-list",
  method: "GET",
  data: {
    params,
    length
  }
});

//meta get user

const metaGetUser = () => reduxAPICall({
  type: "META_GET_USER",
  path: "/voting-app/api/meta-get-user",
  method: "GET"
});

//exports

module.exports = {
  metaCreatePoll,
  metaDeletePoll,
  metaGetPollItem,
  metaGetPollList,
  metaGetUser
};
