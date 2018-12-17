"use strict";

//meta add errors

const metaAddErrors = (errors) => ({
  type: "META_ADD_ERRORS",
  errors
});

//meta close error

const metaCloseError = (index) => ({
  type: "META_CLOSE_ERROR",
  index
});

//meta set state

const metaSetState = (merge, options = { shallow: false }) => ({
  type: "META_SET_STATE",
  merge,
  options
});

//meta timeout error

const metaTimeoutError = () => ({ type: "META_TIMEOUT_ERROR" });

//exports

module.exports = {
  metaAddErrors,
  metaCloseError,
  metaSetState,
  metaTimeoutError
};
