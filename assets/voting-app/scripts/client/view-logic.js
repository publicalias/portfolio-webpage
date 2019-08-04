"use strict";

//local imports

const { updateTooltip } = require("./event-handlers");

//global imports

const { select } = require("dom-api");
const { toPrecision } = require("utilities");

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

const renderChart = (counts, labels) => {

  //scale

  const r = 450 / 2;

  const pieFn = d3.pie().sort(null);

  const arcFn = d3.arc()
    .innerRadius(r / 2)
    .outerRadius(r);

  const data = pieFn(counts);

  //reset

  const empty = counts.reduce((acc, e) => acc + e, 0) === 0;

  const chart = d3.select(".js-render-chart")
    .html("")
    .append("g")
    .attr("transform", `translate(${r}, ${r})`);

  if (empty) {
    chart.append("text")
      .attr("class", "c-poll-display__empty")
      .text(counts.length ? "No Votes" : "No Options");
  }

  //chart

  const DOMTooltip = select(".js-fade-tooltip");

  chart.selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "u-hover")
    .attr("d", (d) => arcFn(d))
    .attr("fill", (d) => chartColor(d.index, data))
    .on("mouseenter", (d) => {

      updateTooltip(labels[d.index], getVotes(d.value), r, arcFn.centroid(d));

      DOMTooltip.animate({ opacity: 1 });

    })
    .on("mouseleave", () => {
      DOMTooltip.animate({ opacity: 0 });
    });

};

//scroll info

const scrollInfo = () => {

  const DOMView = select(".js-scroll-view");

  const view = DOMView.rect().height;
  const content = DOMView.scrollHeight;
  const top = DOMView.scrollTop;

  return {
    view,
    content,
    top,
    bottom: content - view - top
  };

};

//exports

module.exports = {
  chartColor,
  getVotes,
  renderChart,
  scrollInfo
};
