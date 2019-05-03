"use strict";

//local imports

const { encodeAPICall, getJSON } = require("../client-utils");
const { select } = require("../dom-api");
const { metaAddErrors, metaNoOp, metaSetLoading, metaSetState } = require("./meta-factories");

//node modules

const { useEffect } = require("react");

//init reducer

const initReducer = (initialState, handlers) => (state = initialState, action) => {

  const valid = action && handlers[action.type];

  return valid ? valid(state, action) : state;

};

//redux api call

const reduxAPICall = (dispatch, args, successFn, failureFn) => {

  const { path, init } = encodeAPICall(args);

  const loadingFn = (bool) => () => {
    dispatch(metaSetLoading(bool));
  };

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

  loadingFn(true)();

  return getJSON(path, init)
    .then(successFn || successDefault)
    .catch(failureFn || failureDefault)
    .finally(loadingFn());

};

//use loading

const useLoading = (props) => {

  const { data: { loading } } = props;

  useEffect(() => {
    select(".js-loading-state").class("is-loading", true, loading);
  }, [loading]);

};

//exports

module.exports = {
  initReducer,
  reduxAPICall,
  useLoading
};
