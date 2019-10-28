"use strict";

//local imports

const { newListParams } = require("../../schemas");

//global imports

const { getSearchParams, setSearchParams } = require("redux/client-utils");

//get list params

const getListParams = (location) => getSearchParams(newListParams, location);

//set list params

const setListParams = setSearchParams;

//exports

module.exports = {
  getListParams,
  setListParams
};
