"use strict";

//node modules

const d3 = require("d3");

//svg chart

const svgChart = (textX, textY, scaleX = [1, 1], scaleY = [1, 1]) => (params) => {

  const { w, h, m, xa, ya } = params;

  const chart = d3.select(".js-render-chart")
    .append("g")
    .attr("height", h + m.t + m.b)
    .attr("width", w + m.r + m.l)
    .append("g")
    .attr("transform", `translate(${m.l}, ${m.t})`);

  params.chart = chart;

  chart.append("g")
    .attr("transform", `translate(0, ${h * 1.025})`)
    .call(xa)
    .append("text")
    .attr("class", "c-axis")
    .attr("transform", `translate(${w * 0.5 * scaleX[0]}, ${h * 0.15 * scaleX[1]})`)
    .text(textX);

  chart.append("g")
    .attr("transform", `translate(${h * -0.025}, 0)`)
    .call(ya)
    .append("text")
    .attr("class", "c-axis")
    .attr("transform", `translate(${h * -0.15 * scaleY[0]}, ${h * 0.5 * scaleY[1]}) rotate(-90)`)
    .text(textY);

};

//svg params

const svgParams = () => ({
  w: 800,
  h: 450,
  m: null,
  xa: null,
  ya: null,
  chart: null
});

//svg margin

const svgMargin = (params, t = 0.06, r = 0.06, b = 0.18, l = 0.18) => {

  const { w, h } = params;

  const m = {
    t: h * t,
    r: h * r,
    b: h * b,
    l: h * l
  };

  params.m = m;

  params.h = h - m.t - m.b;
  params.w = w - m.r - m.l;

};

//exports

module.exports = {
  svgChart,
  svgParams,
  svgMargin
};
