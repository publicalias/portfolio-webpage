"use strict";

//local imports

const { encodeAPICall, getJSON } = require("../client-utils");
const { metaAddErrors, metaNoOp, metaSetState } = require("./meta-factories");

//init reducer

const initReducer = (initialState, handlers) => (state = initialState, action) => {

  const valid = action && handlers[action.type];

  return valid ? valid(state, action) : state;

};

//redux api call

const reduxAPICall = (dispatch, args, successFn, failureFn) => {

  const { path, init } = encodeAPICall(args);

  const successDefault = (res) => {

    const { errors } = res;
    const { length } = Object.keys(res);

    if (errors) {
      dispatch(metaAddErrors(errors));
    } else if (length) {
      dispatch(metaSetState(res));
    } else {
      dispatch(metaNoOp());
    }

  };

  const failureDefault = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON(path, init)
    .then(successFn || successDefault)
    .catch(failureFn || failureDefault);

};

//exports

module.exports = {
  initReducer,
  reduxAPICall
};
