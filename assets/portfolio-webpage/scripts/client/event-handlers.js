"use strict";

//global imports

const { select } = require("dom-api");

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

//exports

module.exports = {
  positionMenu,
  scrollToItem
};
