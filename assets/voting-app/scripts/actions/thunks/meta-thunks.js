"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");

//meta get polls

const metaGetPolls = (limit) => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/api/meta-get-polls",
    method: "GET",
    data: {
      limit,
      list
    }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = { metaGetPolls };
