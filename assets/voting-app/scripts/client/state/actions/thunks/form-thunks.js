"use strict";

//global imports

const { reduxAPICall } = require("redux-utils/client-utils");

//form add option

const formAddOption = (add, options) => (dispatch) => {

  const args = {
    path: "/voting-app/api/form-add-option",
    method: "GET",
    data: {
      add,
      options
    }
  };

  return reduxAPICall(dispatch, args);

};

//form set title

const formSetTitle = (title) => (dispatch) => {

  const args = {
    path: "/voting-app/api/form-set-title",
    method: "GET",
    data: { title }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = {
  formAddOption,
  formSetTitle
};
