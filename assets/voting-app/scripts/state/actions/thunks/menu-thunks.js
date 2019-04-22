"use strict";

//local imports

const { metaSetState } = require("../factories/meta-factories");

//global imports

const { newState } = require("schemas/voting-app");

//menu open form

const menuOpenForm = (history) => (dispatch) => {

  dispatch(metaSetState({ form: newState().form }));

  history.push("/voting-app/form");

};

//exports

module.exports = { menuOpenForm };
