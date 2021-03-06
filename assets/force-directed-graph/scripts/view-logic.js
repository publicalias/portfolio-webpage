"use strict";

//tooltip borders

const tooltipLinks = (d, data) => {

  const target = (e) => e.target.code === d.code;
  const source = (e) => e.source.code === d.code;

  return data.links
    .filter((e) => target(e) || source(e))
    .map((e) => target(e) ? e.source.country : e.target.country);

};

const tooltipBorders = (d, data) => {

  const links = tooltipLinks(d, data);

  if (!links.length) {
    return "Borders nothing";
  }

  let borders = "Borders";

  const comma = links.length > 2 ? "," : "";

  for (let i = 0; i < links.length; i++) {
    switch (i) {
      case links.length - 1:
        borders = `${borders} ${links[i]}`;
        break;
      case links.length - 2:
        borders = `${borders} ${links[i]}${comma} and `;
        break;
      default:
        borders = `${borders} ${links[i]}, `;
    }
  }

  return borders;

};

//node attr

const nodeAttr = (nodeD, svgD, xOrY) => (d) => {

  const center = nodeD / 2;

  return Math.max(center, Math.min(svgD - center, d[xOrY])) - center;

};

//exports

module.exports = {
  tooltipBorders,
  nodeAttr
};
