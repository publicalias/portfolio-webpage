"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//form add option

const formAddOption = (add, options) => reduxAPICall({
  type: "FORM_ADD_OPTION",
  path: "/voting-app/api/form-add-option",
  method: "GET",
  data: {
    add,
    options
  }
});

//form check title

const formCheckTitle = (title) => reduxAPICall({
  type: "FORM_CHECK_TITLE",
  path: "/voting-app/api/form-check-title",
  method: "GET",
  data: { title }
});

//exports

module.exports = {
  formAddOption,
  formCheckTitle
};
