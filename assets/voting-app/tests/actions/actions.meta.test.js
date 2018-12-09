"use strict";

//local imports

const actions = require("../../scripts/actions/actions");

//meta set state

test("metaSetState creates META_SET_STATE actions", () => {

  const { metaSetState } = actions;

  const merge = { list: { polls: [{ title: "" }] } };

  expect(metaSetState(merge)).toEqual({
    type: "META_SET_STATE",
    merge
  });

});
