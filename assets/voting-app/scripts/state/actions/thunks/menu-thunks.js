"use strict";

//global imports

const { metaSetState } = require("redux-utils/meta-factories");
const { newState } = require("schemas/voting-app");

//menu open form

const menuOpenForm = (history) => (dispatch) => {

  dispatch(metaSetState({ form: newState().form }));

  history.push("/voting-app/form");

};

//exports

module.exports = { menuOpenForm };
