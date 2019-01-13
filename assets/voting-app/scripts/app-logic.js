"use strict";

//local imports

const { metaSetState, metaAddErrors } = require("./actions/factories/meta-factories");

//global imports

const { encodeAPICall, getJSON } = require("utilities");

//redux api call

const reduxAPICall = (dispatch, args, success, failure) => {

  const { path, init } = encodeAPICall(args);

  const successFn = success || ((res) => {
    dispatch(metaSetState(res));
  });

  const failureFn = failure || ((err) => {
    dispatch(metaAddErrors([err.message]));
  });

  return getJSON(path, init)
    .then(successFn)
    .catch(failureFn);

};

module.exports = { reduxAPICall };
