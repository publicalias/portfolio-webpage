"use strict";

//local imports

const { newForm, newListParams } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//meta create poll

describe("metaCreatePoll", () => {

  const { metaCreatePoll } = actions;

  testAPI.default(metaCreatePoll(newForm()), {
    path: "/voting-app/api/meta-create-poll",
    method: "POST",
    data: newForm()
  });

});

//meta delete poll

describe("metaDeletePoll", () => {

  const { metaDeletePoll } = actions;

  testAPI.default(metaDeletePoll(""), {
    path: "/voting-app/api/meta-delete-poll",
    method: "DELETE",
    data: { id: "" }
  });

});

//meta get poll item

describe("metaGetPollItem", () => {

  const { metaGetPollItem } = actions;

  testAPI.default(metaGetPollItem(""), {
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
    path: "/voting-app/api/meta-get-user",
    method: "GET"
  });

});
