"use strict";

//global imports

const { select } = require("all/dom-api");

//update tooltip

const updateTooltip = (label, count, r, [x, y]) => {

  const DOMTooltip = select(".js-toggle-tooltip");

  select(".js-edit-label").text(label);
  select(".js-edit-count").text(count);

  const { height: ch, left: cl, top: ct, width: cw } = select(".js-render-chart").rect();
  const { height: th, width: tw } = DOMTooltip.rect();

  const perc = (n) => 0.5 + 0.5 * n / r;

  DOMTooltip.css({
    top: `${ct + perc(y) * ch - th}px`,
    left: `${cl + perc(x) * cw - tw}px`
  });

};

//exports

module.exports = { updateTooltip };
