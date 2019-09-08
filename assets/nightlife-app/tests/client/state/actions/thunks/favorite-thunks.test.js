"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//favorite add

describe("favorite add", () => {

  const { favoriteAdd } = actions;

  testAPI.default(favoriteAdd("", ""), {
    path: "/nightlife-app/api/favorite-add",
    method: "POST",
    data: {
      venue: {
        name: "",
        id: ""
      }
    }
  });

});

//favorite remove

describe("favoriteRemove", () => {

  const { favoriteRemove } = actions;

  testAPI.default(favoriteRemove(""), {
    path: "/nightlife-app/api/favorite-remove",
    method: "DELETE",
    data: { id: "" }
  });

});
