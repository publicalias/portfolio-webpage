"use strict";

//local imports

const { metaSetState, metaAddErrors } = require("./actions/factories/meta-factories");

//global imports

const { getJSON } = require("utilities");

//redux api call

const reduxAPICall = (dispatch, path, body, success, failure) => {

  const bodyObj = {
    method: "POST",
    body,
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const successFn = success || ((res) => {
    dispatch(metaSetState(res));
  });

  const failureFn = failure || ((err) => {
    dispatch(metaAddErrors([err.message]));
  });

  return getJSON(path, bodyObj)
    .then(successFn)
    .catch(failureFn);

};

module.exports = { reduxAPICall };
