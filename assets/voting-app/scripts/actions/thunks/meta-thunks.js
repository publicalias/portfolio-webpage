"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");

//meta get polls

const metaGetPolls = () => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/api/meta-get-polls",
    method: "GET",
    data: { list }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = { metaGetPolls };
