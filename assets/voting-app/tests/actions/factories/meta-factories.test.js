"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");

//meta add error

test("metaAddErrors creates META_ADD_ERRORS actions", () => {

  const { metaAddErrors } = actions;

  expect(metaAddErrors([])).toEqual({
    type: "META_ADD_ERRORS",
    errors: []
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

  const { metaSetState } = actions;

  it("creates META_SET_STATE actions", () => {
    expect(metaSetState({})).toEqual({
      type: "META_SET_STATE",
      merge: {}
    });
  });

  it("creates META_SET_STATE actions with config", () => {

    const config = { object: true };

    expect(metaSetState({}, config)).toEqual({
      type: "META_SET_STATE",
      merge: {},
      config
    });

  });

});

//meta timeout error

test("metaTimeoutError creates META_TIMEOUT_ERROR actions", () => {

  const { metaTimeoutError } = actions;

  expect(metaTimeoutError()).toEqual({ type: "META_TIMEOUT_ERROR" });

});
