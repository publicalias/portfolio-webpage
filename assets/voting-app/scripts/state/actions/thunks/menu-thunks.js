"use strict";

//local imports

const { metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//menu open form

const menuOpenForm = (history) => (dispatch) => {

  dispatch(metaSetState({ form: initialState.form }));

  history.push("/voting-app/form");

};

//exports

module.exports = { menuOpenForm };
