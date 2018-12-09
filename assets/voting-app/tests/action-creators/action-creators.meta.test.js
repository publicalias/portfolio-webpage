"use strict";

//local imports

const { metaSetState } = require("../../scripts/action-creators/action-creators");

//meta set state

test("metaSetState creates META_SET_STATE actions", () => {

  const merge = { list: { polls: [{ title: "" }] } };

  expect(metaSetState(merge)).toEqual({
    type: "META_SET_STATE",
    merge
  });

});
