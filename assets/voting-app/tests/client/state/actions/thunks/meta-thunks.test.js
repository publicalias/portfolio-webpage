"use strict";

//local imports

const { newForm, newListParams } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//meta create poll

describe("metaCreatePoll", () => {

  const { metaCreatePoll } = actions;

  testAPI.default(metaCreatePoll(newForm()), {
    type: "META_CREATE_POLL",
    path: "/voting-app/api/meta-create-poll",
    method: "POST",
    data: newForm()
  });

});

//meta delete poll

describe("metaDeletePoll", () => {

  const { metaDeletePoll } = actions;

  testAPI.default(metaDeletePoll(""), {
    type: "META_DELETE_POLL",
    path: "/voting-app/api/meta-delete-poll",
    method: "DELETE",
    data: { id: "" }
  });

});

//meta get poll item

describe("metaGetPollItem", () => {

  const { metaGetPollItem } = actions;

  testAPI.default(metaGetPollItem(""), {
    type: "META_GET_POLL_ITEM",
    path: "/voting-app/api/meta-get-poll-item",
    method: "GET",
    data: { id: "" }
  });

});

//meta get poll list

describe("metaGetPollList", () => {

  const { metaGetPollList } = actions;

  const params = newListParams();

  testAPI.default(metaGetPollList(params), {
    type: "META_GET_POLL_LIST",
    path: "/voting-app/api/meta-get-poll-list",
    method: "GET",
    data: {
      params,
      length: undefined
    }
  });

});

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser } = actions;

  testAPI.default(metaGetUser(), {
    type: "META_GET_USER",
    path: "/voting-app/api/meta-get-user",
    method: "GET"
  });

});
