"use strict";

//local imports

const { metaAddErrors, metaNoOp, metaSetState } = require("./actions/factories/meta-factories");

//global imports

const { encodeAPICall, getJSON } = require("client-utils");

//redux api call

const reduxAPICall = (dispatch, args, success, failure) => {

  const { path, init } = encodeAPICall(args);

  const successFn = success || ((res) => {

    const { errors } = res;
    const { length } = Object.keys(res);

    if (errors) {
      dispatch(metaAddErrors(errors));
    } else if (length) {
      dispatch(metaSetState(res));
    } else {
      dispatch(metaNoOp());
    }

  });

  const failureFn = failure || ((err) => {
    dispatch(metaAddErrors([err.message]));
  });

  return getJSON(path, init)
    .then(successFn)
    .catch(failureFn);

};

module.exports = { reduxAPICall };
