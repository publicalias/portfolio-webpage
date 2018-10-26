"use strict";

//global imports

const { smoothScroll } = require("utilities");

//get next view

const getNextView = (right, showcase, last) => {

  const length = showcase.projects.length;

  let next = last + (right ? 1 : -1);

  if (next === -1) {
    next = length - 1;
  } else if (next === length) {
    next = 0;
  }

  return next;

};

//load recaptcha

const loadReCaptcha = () => {
  $(".js-load-script").append("<script src=\"https://www.google.com/recaptcha/api.js\"></script>");
};

//position menu

const positionMenu = () => {

  const $sublist = $(".js-expand-sublist");

  if ($sublist.css("display") === "none") {
    return;
  }

  const scrollTop = $(document.scrollingElement).scrollTop();
  const margin = $(window).outerWidth() * 0.045;

  const offsetTop = scrollTop < margin ? margin - scrollTop : 0;

  $sublist.css({ top: $(".js-ref-nav-bar").outerHeight() + offsetTop });

};

//reset form

const resetForm = (btnIndex) => ({
  email: "",
  subject: "",
  body: "",
  btnIndex
});

//scroll to item

const scrollToItem = (link) => () => {

  const offsetTop = $(link).offset().top;
  const navBar = $(".js-ref-nav-bar").outerHeight();
  const margin = $(window).outerWidth() * 0.045;

  $(".js-expand-sublist").hide();

  smoothScroll(link === ".js-scroll-bio" ? 0 : offsetTop - navBar - margin);

};

//exports

module.exports = {
  getNextView,
  loadReCaptcha,
  positionMenu,
  resetForm,
  scrollToItem
};
