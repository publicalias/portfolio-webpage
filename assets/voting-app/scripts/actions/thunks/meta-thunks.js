"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");

//meta get polls

const metaGetPolls = (limit) => (dispatch, getState) => {

  const { list } = getState();

  const body = {
    limit,
    list
  };

  return reduxAPICall(dispatch, "/api/meta-get-polls", body);

};

//exports

module.exports = { metaGetPolls };
