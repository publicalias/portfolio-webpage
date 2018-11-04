"use strict";

//global imports

const { select } = require("dom-api");

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

//item is in view

const itemIsInView = ($item, addTop = 0, addBottom = 0) => {

  const windowTop = $(document.scrollingElement).scrollTop();
  const windowBottom = windowTop + $(window).outerHeight();

  const itemTop = $item.offset().top;
  const itemBottom = itemTop + $item.outerHeight();

  const notAbove = windowBottom - addBottom > itemTop;
  const notBelow = windowTop + addTop < itemBottom;

  return notAbove && notBelow;

};

//load recaptcha

const loadReCaptcha = () => {
  $(".js-load-script").append("<script src=\"https://www.google.com/recaptcha/api.js\"></script>");
};

//position menu

const positionMenu = () => {

  const DOMSublist = select(".js-expand-sublist");

  if (DOMSublist.css().display === "none") {
    return;
  }

  const scrollTop = $(document.scrollingElement).scrollTop();
  const margin = $(window).outerWidth() * 0.045;

  const offsetTop = scrollTop < margin ? margin - scrollTop : 0;

  DOMSublist.css({ top: `${$(".js-ref-nav-bar").outerHeight() + offsetTop}px` });

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

  const scrollTop = link === ".js-scroll-bio" ? 0 : offsetTop - navBar - margin;

  select(".js-expand-sublist").class("is-open", true, false);

  select(document.scrollingElement).animate({ scrollTop });

};

//void link

const voidLink = (link) => link || "javascript:void(0)";

//exports

module.exports = {
  getNextView,
  itemIsInView,
  loadReCaptcha,
  positionMenu,
  resetForm,
  scrollToItem,
  voidLink
};
