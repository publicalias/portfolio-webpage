"use strict";

//local imports

const { getListParams } = require("./app-logic");

//handle reload

const handleReload = async (fn, props, list) => {

  const { actions: { metaGetPolls, metaGetUser }, data: { polls }, local: { poll } } = props;

  const args = list ? [getListParams(location), null, polls.length] : [null, poll.id];

  await fn();

  metaGetUser();
  metaGetPolls(...args);

};

//exports

module.exports = { handleReload };
