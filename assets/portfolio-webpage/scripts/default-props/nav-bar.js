"use strict";

//nav bar

const navBar = [{
  name: "Bio",
  type: "item",
  link: ".js-scroll-bio"
}, {
  name: "Portfolio",
  type: "sublist",
  sublist: [{
    type: "rule"
  }, {
    name: "Showcase",
    type: "item",
    link: ".js-scroll-showcase"
  }, {
    type: "rule"
  }, {
    name: "Front end",
    type: "item",
    link: ".js-scroll-front-end"
  }, {
    name: "Data Vis",
    type: "item",
    link: ".js-scroll-data-vis"
  }, {
    name: "Back end",
    type: "item",
    link: ".js-scroll-back-end"
  }]
}, {
  name: "Contact",
  type: "item",
  link: ".js-scroll-contact"
}];

//exports

module.exports = { navBar };
