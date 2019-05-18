"use strict";

//global imports

const { metaSetState } = require("redux-utils/meta-factories");
const { newState } = require("schemas/voting-app");
const { deepCopy } = require("utilities");

//list set filter

const listSetFilter = (filter, history) => (dispatch) => {

  dispatch(metaSetState({ list: deepCopy(newState().list, { filter }) }));

  history.push("/list");

};

//exports

module.exports = { listSetFilter };
