"use strict";

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

const renderChart = (counts) => {

  //scale

  const r = 450 / 2;

  //reset

  const chart = d3.select(".js-render-chart")
    .html("")
    .append("g")
    .attr("transform", `translate(${r}, ${r})`);

  //votes

  chart.append("text").attr("class", "c-poll-display__votes js-toggle-votes");

  const DOMVotes = select(".js-toggle-votes");

  if (counts.reduce((acc, e) => acc + e, 0) === 0) {
    DOMVotes.css({ opacity: 1 }).text(counts.length === 0 ? "No Options" : "No Votes");
  }

  //data

  const pieFn = d3.pie().sort(null);

  const arcFn = d3.arc()
    .innerRadius(r / 2)
    .outerRadius(r);

  const data = pieFn(counts);

  //chart

  chart.selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "u-hover")
    .attr("d", (d) => arcFn(d))
    .attr("fill", (d) => chartColor(d.index, data))
    .on("mouseenter", (d) => {
      DOMVotes.animate({ opacity: 1 }).text(getVotes(d.value));
    })
    .on("mouseleave", () => {
      DOMVotes.animate({ opacity: 0 });
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
