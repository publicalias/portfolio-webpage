"use strict";

//local imports

const { getListParams } = require("./app-logic");

//global imports

const { select } = require("dom-api");

//handle reload

const handleReload = async (fn, props, list) => {

  const { actions: { metaGetPolls, metaGetUser }, data: { polls }, local: { poll }, location } = props;

  const args = list ? [getListParams(location), null, polls.length] : [null, poll.id];

  await fn();

  metaGetUser();
  metaGetPolls(...args);

};

//update tooltip

const updateTooltip = (label, count, r, [x, y]) => {

  const DOMTooltip = select(".js-fade-tooltip");

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

module.exports = {
  handleReload,
  updateTooltip
};
