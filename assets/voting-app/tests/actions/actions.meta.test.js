"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const actions = require("../../scripts/actions/actions");

//meta set state

describe("metaSetState", () => {

  it("creates META_SET_STATE actions", () => {

    const { metaSetState } = actions;

    const merge = { user: { name: "" } };

    expect(metaSetState(merge)).toEqual({
      type: "META_SET_STATE",
      merge,
      options: { shallow: false }
    });

  });

  it("creates META_SET_STATE actions with options", () => {

    const { metaSetState } = actions;

    const merge = { user: {} };

    expect(metaSetState(merge, { shallow: true })).toEqual({
      type: "META_SET_STATE",
      merge,
      options: { shallow: true }
    });

  });

});
