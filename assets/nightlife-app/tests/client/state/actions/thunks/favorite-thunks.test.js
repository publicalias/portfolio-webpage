"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//favorite add

describe("favoriteAdd", () => {

  const { favoriteAdd } = actions;

  testAPI.default(favoriteAdd("", ""), {
    type: "FAVORITE_ADD",
    path: "/nightlife-app/api/favorite-add",
    method: "POST",
    data: {
      name: "",
      id: ""
    }
  });

});

//favorite remove

describe("favoriteRemove", () => {

  const { favoriteRemove } = actions;

  testAPI.default(favoriteRemove(""), {
    type: "FAVORITE_REMOVE",
    path: "/nightlife-app/api/favorite-remove",
    method: "DELETE",
    data: { id: "" }
  });

});
