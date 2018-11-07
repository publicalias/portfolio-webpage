"use strict";

//global imports

const { select } = require("dom-api");

//get svg

const getSVG = (app, svg, ready, steps) => () => {

  if (app.ready !== ready) {
    return;
  }

  //build chart

  const params = svg.svgParams();

  for (const e of steps) {
    svg[e](params);
  }

};

//tooltip

const getPosition = ({ height, left, top, width }, DOMTooltip) => ({
  above: top - DOMTooltip.rect().height,
  below: top + height,
  left: left - DOMTooltip.rect().width,
  right: left + width
});

const tooltip = (bool = false, node, top, left) => {

  const DOMTooltip = select(".js-toggle-tooltip");

  DOMTooltip.class("is-open", true, bool);

  if (bool) {

    const thisRect = select(node || d3.event.target).rect();
    const svgRect = select(".js-ref-svg").rect();

    const displayBelow = thisRect.top - svgRect.top < svgRect.height / 2;
    const displayRight = thisRect.left - svgRect.left < svgRect.width / 2;

    const p = getPosition(thisRect, DOMTooltip);

    DOMTooltip.css({ top: `${top || (displayBelow ? p.below : p.above)}px` });
    DOMTooltip.css({ left: `${left || (displayRight ? p.right : p.left)}px` });

  }

};

//exports

module.exports = {
  getSVG,
  tooltip
};
