"use strict";

//local imports

const { updateTooltip } = require("./event-handlers");

//global imports

const { select } = require("all/dom-api");
const { hookEvent } = require("all/react-utils");
const { toPrecision } = require("all/utilities");

//node modules

const d3 = require("d3");

//chart color

const chartColor = (i, arr) => {

  const val = i && i / (arr.length - 1) * 255;

  return `rgba(${val}, ${val}, ${val}, 0.75)`;

};

//get votes

const getVotes = (n) => {

  const check = (mag, symbol) => {

    const val = n / 10 ** mag;
    const cap = 10 ** 3;
    const str = val >= cap ? "???" : `${toPrecision(val, 3)}${symbol}`;

    return val >= 1 && str;

  };

  const k = check(3, "K");
  const m = check(6, "M");

  return `${m || k || n} Votes`;

};

//render chart

const tooltipHandler = (update) => {

  const DOMTooltip = select(".js-toggle-tooltip");

  const state = { timeout: null };

  const tooltip = (bool = false) => (d) => {

    const event = d3.event;

    if (bool) {
      event.stopPropagation();
    }

    state.timeout = setTimeout(() => {

      DOMTooltip.class("is-open", true, bool);

      select(".js-toggle-hover").class("is-hovered", true, false);

      if (!bool) {
        return;
      }

      select(event.target).class("is-hovered", true, true);

      update(d);

    });

  };

  const cleanup = hookEvent(DOMTooltip, "mouseenter mouseleave", (event) => {
    if (event.type === "mouseenter") {
      clearTimeout(state.timeout);
    } else {
      tooltip()();
    }
  });

  return {
    cleanup,
    tooltip
  };

};

const chartProps = (counts, labels) => {

  const r = 450 / 2;

  const pieFn = d3.pie().sort(null);

  const arcFn = d3.arc()
    .innerRadius(r / 2)
    .outerRadius(r);

  const data = pieFn(counts);

  const update = (d) => updateTooltip(
    labels[d.index],
    getVotes(d.value),
    r,
    arcFn.centroid(d)
  );

  const { cleanup, tooltip } = tooltipHandler(update);

  return {
    arcFn,
    cleanup,
    data,
    r,
    tooltip
  };

};

const renderChart = (counts, labels) => {

  const { arcFn, cleanup, data, r, tooltip } = chartProps(counts, labels);

  //reset

  const empty = counts.reduce((acc, e) => acc + e, 0) === 0;

  const chart = d3.select(".js-render-chart")
    .html("")
    .on("touchstart", tooltip(), { passive: true })
    .append("g")
    .attr("transform", `translate(${r}, ${r})`);

  if (empty) {
    chart.append("text")
      .attr("class", "c-poll-display__empty")
      .text(counts.length ? "No Votes" : "No Options");
  }

  tooltip()();

  //chart

  chart.selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "js-toggle-hover")
    .attr("d", (d) => arcFn(d))
    .attr("fill", (d) => chartColor(d.index, data))
    .on("mouseenter", tooltip(true))
    .on("mouseleave", tooltip())
    .on("touchstart", tooltip(true), { passive: true });

  return cleanup;

};

//exports

module.exports = {
  chartColor,
  getVotes,
  renderChart
};
