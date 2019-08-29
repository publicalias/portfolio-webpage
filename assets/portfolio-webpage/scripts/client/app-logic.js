"use strict";

//global imports

const { select } = require("all/dom-api");

//node modules

const { useEffect, useRef } = require("react");

//reset form

const resetForm = (btnIndex) => ({
  email: "",
  subject: "",
  body: "",
  btnIndex
});

//use recaptcha

const loadReCaptcha = () => {

  const script = document.createElement("script"); //doesn't execute as dom string

  script.src = "https://www.google.com/recaptcha/api.js";

  select(".js-load-script").appendChild(script);

};

const useReCaptcha = (fn) => {

  const callback = useRef();

  useEffect(() => {
    callback.current = fn;
  });

  useEffect(() => {

    window.getReCaptcha = (data) => {
      callback.current(data); //callback must precede script
    };

    loadReCaptcha();

  }, []);

};

//safe link

const safeLink = (href) => href ? { href } : {};

//exports

module.exports = {
  resetForm,
  safeLink,
  useReCaptcha
};
