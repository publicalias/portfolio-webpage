"use strict";

//local imports

const { metaAddErrors, metaSetState } = require("../factories/meta-factories");

//global imports

const { getJSON } = require("utilities");

//meta get polls

const metaGetPolls = () => (dispatch) => {

  const success = (res) => {
    dispatch(metaSetState(res));
  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/meta/get-polls")
    .then(success)
    .catch(failure);

};

//exports

module.exports = { metaGetPolls };
