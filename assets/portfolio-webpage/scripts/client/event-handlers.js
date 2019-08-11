"use strict";

//global imports

const { select } = require("dom-api");

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

module.exports = { scrollToItem };
