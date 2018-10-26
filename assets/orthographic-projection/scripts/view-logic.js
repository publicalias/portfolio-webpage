"use strict";

//tooltip address

const tooltipAddress = (d) => (res) => {

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

const tooltipHandler = (d, node, tooltip) => () => {

  //check current node

  const DOMHover = document.querySelectorAll(":hover");

  if (DOMHover[DOMHover.length - 1] !== node) {
    return;
  }

  //display tooltip

  const { address, mass, name, recclass } = d.properties;

  $(".js-edit-name").text(name);
  $(".js-edit-mass").text(tooltipMass(mass));
  $(".js-edit-class").text(`${recclass} class`);
  $(".js-edit-address").text(address);

  $(node).addClass("is-active");

  tooltip(true, node);

};

//exports

module.exports = {
  tooltipAddress,
  tooltipHandler
};
