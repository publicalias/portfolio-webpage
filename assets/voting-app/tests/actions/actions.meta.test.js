"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const actions = require("../../scripts/actions/actions");

//meta add error

test("metaAddErrors creates META_ADD_ERRORS actions", () => {

  const { metaAddErrors } = actions;

  const errors = ["500 Internal Server Error"];

  expect(metaAddErrors(errors)).toEqual({
    type: "META_ADD_ERRORS",
    errors
  });

});

//meta close error

test("metaCloseError creates META_CLOSE_ERROR actions", () => {

  const { metaCloseError } = actions;

  expect(metaCloseError(0)).toEqual({
    type: "META_CLOSE_ERROR",
    index: 0
  });

});

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

//meta timeout error

test("metaTimeoutError creates META_TIMEOUT_ERROR actions", () => {

  const { metaTimeoutError } = actions;

  expect(metaTimeoutError()).toEqual({ type: "META_TIMEOUT_ERROR" });

});
