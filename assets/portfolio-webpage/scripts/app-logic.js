"use strict";

//global imports

const { select } = require("dom-api");

//load recaptcha

const loadReCaptcha = () => {

  const script = document.createElement("script"); //doesn't execute as dom string

  script.src = "https://www.google.com/recaptcha/api.js";

  select(".js-load-script").appendChild(script);

};

//reset form

const resetForm = (btnIndex) => ({
  email: "",
  subject: "",
  body: "",
  btnIndex
});

//void link

const voidLink = (link) => link || "javascript:void(0)";

//exports

module.exports = {
  loadReCaptcha,
  resetForm,
  voidLink
};
