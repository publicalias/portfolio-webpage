"use strict";

//point radius

const pointRadius = (w, mean) => (d) => {

  if (!d.properties) {
    return;
  }

  const mass = d.properties.mass;

  const min = mean * 0.5;
  const max = mean * 1.5;

  let scale = (mass - min) / max + 0.5;

  scale = Math.min(Math.max(scale, 0.5), 1.5);

  return w * scale / 100;

};

//tooltip address

const tooltipAddress = (d, res) => {
  if (res.status === "OK") {
    d.properties.address = `Fell near ${res.results[0].formatted_address} in ${d.properties.year}`;
  } else {
    d.properties.address = "No address found";
  }
};

//exports

module.exports = {
  pointRadius,
  tooltipAddress
};
