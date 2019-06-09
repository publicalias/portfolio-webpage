"use strict";

//local imports

const { getListParams } = require("./app-logic");

//handle reload

const handleReload = (fn, props, list) => async () => {

  const { actions: { metaGetPolls, metaGetUser }, data: { polls }, poll: { id } } = props;

  const args = list ? [getListParams(location), null, polls.length] : [null, id];

  await fn();

  metaGetUser();
  metaGetPolls(...args);

};

//exports

module.exports = { handleReload };
