"use strict";

//global imports

const { getJSON } = require("utilities");

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

//meta get polls

const metaGetPolls = () => (dispatch) => {

  const success = (res) => {
    dispatch(metaSetState(res));
  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/get-polls")
    .then(success)
    .catch(failure);

};

//meta timeout error

const metaTimeoutError = () => ({ type: "META_TIMEOUT_ERROR" });

//exports

module.exports = {
  metaAddErrors,
  metaCloseError,
  metaGetPolls,
  metaSetState,
  metaTimeoutError
};
