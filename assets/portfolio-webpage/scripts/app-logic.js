"use strict";

//global imports

const { select } = require("dom-api");

//item is in view

const itemIsInView = (id, addTop = 0, addBottom = 0) => {

  const DOMRect = select(id).rect();

  const windowTop = window.scrollY;
  const windowBottom = windowTop + window.innerHeight;

  const itemTop = DOMRect.top;
  const itemBottom = itemTop + DOMRect.height;

  const notAbove = windowBottom - addBottom > itemTop;
  const notBelow = windowTop + addTop < itemBottom;

  return notAbove && notBelow;

};

//load recaptcha

const loadReCaptcha = () => {

  const script = document.createElement("script"); //doesn't execute as dom string

  script.src = "https://www.google.com/recaptcha/api.js";

  select(".js-load-script").appendChild(script);

};

//position menu

const positionMenu = () => {

  const DOMSublist = select(".js-expand-sublist");

  if (DOMSublist.css().display === "none") {
    return;
  }

  const DOMNavBar = select(".js-ref-nav-bar");

  const windowTop = window.scrollY;
  const navMargin = parseFloat(DOMNavBar.css().marginTop);
  const offsetTop = windowTop < navMargin ? navMargin - windowTop : 0;

  DOMSublist.css({ top: `${DOMNavBar.rect().height + offsetTop}px` });

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

  const DOMNavBar = select(".js-ref-nav-bar");

  const offsetTop = select(link).rect().top;
  const navHeight = DOMNavBar.rect().height;
  const navMargin = parseFloat(DOMNavBar.css().marginTop);

  const scrollTop = link === ".js-scroll-bio" ? 0 : offsetTop - navHeight - navMargin;

  select(".js-expand-sublist").class("is-open", true, false);

  select(document.scrollingElement).animate({ scrollTop });

};

//void link

const voidLink = (link) => link || "javascript:void(0)";

//exports

module.exports = {
  itemIsInView,
  loadReCaptcha,
  positionMenu,
  resetForm,
  scrollToItem,
  voidLink
};
