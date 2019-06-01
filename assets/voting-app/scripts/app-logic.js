"use strict";

const { newListParams } = require("schemas/voting-app");

//get list params

const getListParams = (location) => {

  const query = new URLSearchParams(location.search);

  const params = newListParams();

  for (const e of Object.keys(params)) {
    if (query.get(e)) {
      params[e] = query.get(e);
    }
  }

  return params;

};

//set list params

const setListParams = (location, key, val) => {

  const query = new URLSearchParams(location.search);

  if (val) {
    query.set(key, val);
  } else {
    query.delete(key);
  }

  query.sort();

  const params = query.toString();

  return params ? `?${params}` : "";

};

//exports

module.exports = {
  getListParams,
  setListParams
};
