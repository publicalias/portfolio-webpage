"use strict";

//global imports

const { select } = require("dom-api");

//tooltip address

const tooltipAddress = (d, res) => {

  const { year } = d.properties;

  if (res.status === "OK") {
    d.properties.address = `Fell near ${res.results[0].formatted_address} in ${year}`;
  } else {
    d.properties.address = "No address found";
  }

};

//tooltip handler

const tooltipMass = (mass) => {

  if (mass >= 1000) {
    return `${mass / 1000}t`;
  } else if (mass < 1) {
    return `${mass * 1000}g`;
  }

  return `${mass}kg`;

};

const tooltipHandler = (d, node, tooltip) => {

  //check current node

  const DOMHover = select(":hover");

  if (DOMHover.all[DOMHover.all.length - 1] !== node) {
    return;
  }

  //display tooltip

  const { address, mass, name, recclass } = d.properties;

  select(".js-edit-name").text(name);
  select(".js-edit-mass").text(tooltipMass(mass));
  select(".js-edit-class").text(`${recclass} class`);
  select(".js-edit-address").text(address);

  select(node).class("is-active", true, true);

  tooltip(true, node);

};

//exports

module.exports = {
  tooltipAddress,
  tooltipHandler
};
