"use strict";

//tooltip text

const tooltipMass = (mass) => {

  if (mass >= 1000) {
    return `${mass / 1000}t`;
  } else if (mass < 1) {
    return `${mass * 1000}g`;
  }

  return `${mass}kg`;

};

const tooltipAddress = (res, year) => {

  if (res.status === "OK") {
    return `Fell near ${res.results[0].formatted_address} in ${year}`;
  }

  return "No address found";

};

const tooltipText = (d, node, tooltip) => (res) => {

  //display tooltip

  const { mass, year, name, recclass } = d.properties;

  $(".js-edit-name").text(name);
  $(".js-edit-mass").text(tooltipMass(mass));
  $(".js-edit-class").text(`${recclass} class`);
  $(".js-edit-address").text(tooltipAddress(res, year));

  tooltip(true, node);

};

//exports

module.exports = { tooltipText };
