"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { metaSetState } = require("../scripts/action-creators");

//tests

describe("metaSetState", () => {
  it("creates META_SET_STATE actions", () => {

    const merge = { list: { polls: [{ title: "" }] } };

    expect(metaSetState(merge)).toEqual({
      type: "META_SET_STATE",
      merge
    });

  });
});
