"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");

//meta get polls

const metaGetPolls = () => (dispatch) => reduxAPICall(dispatch, "/api/meta/get-polls");

//exports

module.exports = { metaGetPolls };
