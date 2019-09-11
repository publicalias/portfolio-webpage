"use strict";

//local imports

const { getListParams } = require("./app-logic");

//global imports

const { select } = require("all/dom-api");

//handle reload

const handleReload = async (fn, props, list) => {

  const {
    actions: { metaGetPollItem, metaGetPollList, metaGetUser },
    data: { polls },
    local: { poll },
    location
  } = props;

  const res = await fn();

  metaGetUser();

  if (list) {
    metaGetPollList(getListParams(location), polls.length);
  } else {
    metaGetPollItem(poll.id);
  }

  return res;

};

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

module.exports = {
  handleReload,
  updateTooltip
};
