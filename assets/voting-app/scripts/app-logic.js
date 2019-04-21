"use strict";

//local imports

const { metaAddErrors, metaNoOp, metaSetState } = require("./state/actions/factories/meta-factories");

//global imports

const { initReduxAPICall } = require("client-utils");

//redux api call

const reduxAPICall = initReduxAPICall(metaSetState, metaAddErrors, metaNoOp);

//exports

module.exports = { reduxAPICall };
