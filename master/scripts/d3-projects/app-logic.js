"use strict";

//get svg

const getSVG = (app, svg, ready, steps) => () => {

  if (app.ready !== ready) {
    return;
  }

  //reset chart

  $(".js-render-chart").empty();

  app.tooltip();

  if (app.resetData) {
    app.resetData();
  }

  //build chart

  const params = svg.svgParams();

  for (const e of steps) {
    svg[e](params);
  }

};

//tooltip

const getPosition = ({ height, left, top, width }, $tooltip) => ({
  above: top - $tooltip.outerHeight(),
  below: top + height,
  left: left - $tooltip.outerWidth(),
  right: left + width
});

const tooltip = (bool = false, node, top, left) => {

  const $tooltip = $(".js-toggle-tooltip");

  if (bool) {

    const thisRect = (node || d3.event.target).getBoundingClientRect();
    const svgRect = document.querySelector(".js-ref-svg").getBoundingClientRect();

    const displayBelow = thisRect.top - svgRect.top < svgRect.height / 2;
    const displayRight = thisRect.left - svgRect.left < svgRect.width / 2;

    const pos = getPosition(thisRect, $tooltip);

    $tooltip.css("top", top || (displayBelow ? pos.below : pos.above));
    $tooltip.css("left", left || (displayRight ? pos.right : pos.left));

  }

  $tooltip.toggle(bool);

};

//exports

module.exports = {
  getSVG,
  tooltip
};
