"use strict";

//global imports

const { getJSON } = require("all/client-utils");
const { select } = require("all/dom-api");
const { bindObject, months } = require("all/utilities");
const { getSVG, tooltip } = require("d3/app-logic");
const { checkTooltip, globalEvents } = require("d3/event-handlers");
const { svgChart, svgParams, svgMargin } = require("d3/view-logic");

//node modules

const d3 = require("d3");

//utilities

const calcMeanTemp = (data) => {

  const mean = data.map((e) => e.temp);

  return Number(d3.mean(mean).toFixed(3));

};

//app logic

const app = {

  data: null,
  dataURL: "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",

  mean: null,

  ready: 0,

  //tooltip

  tooltip,

  handleMouseEnter(d) {

    select(".js-edit-date").text(`${months[d.month - 1]} ${d.year}`);
    select(".js-edit-temp").html(`Temperature: ${d.temp}&deg;C`);
    select(".js-edit-variance").html(`Variance: ${d.variance}&deg;C`);

    select(d3.event.target).class("is-active", true, true);

    this.tooltip(true);

  },

  handleMouseLeave() {

    select(".js-ref-data").class("is-active", true, false);

    this.tooltip();

  },

  //parse data

  parseData(res) {

    this.data = res.monthlyVariance.slice(0, 3144); //flat edge

    for (const e of this.data) {
      e.temp = Number((e.variance + res.baseTemperature).toFixed(3));
    }

    this.mean = calcMeanTemp(this.data);

    for (const e of this.data) {
      e.variance = Number((e.temp - this.mean).toFixed(3));
    }

    this.ready++;

    select(".js-edit-mean").text(app.mean);

    this.getSVG();

  }

};

//svg logic

const svg = {

  //params

  svgParams,

  //margin

  svgMargin(params) {
    return svgMargin(params, undefined, undefined, 0.24, 0.3);
  },

  //axes

  svgAxes(params) {

    const { w, h } = params;

    const x = d3.scaleLinear()
      .domain([1753, 2014])
      .range([0, w]);
    const y = d3.scaleBand()
      .domain(months.slice().reverse())
      .range([h, 0]);

    const ticks = [1753, 1782, 1811, 1840, 1869, 1898, 1927, 1956, 1985, 2014];

    params.xa = d3.axisBottom(x).tickValues(ticks);
    params.ya = d3.axisLeft(y);

  },

  //chart

  svgChart: svgChart("Year", "Month", undefined, [2, 1]),

  //data

  svgData(params) {

    const { w, h, chart } = params;

    chart.selectAll("rect")
      .data(app.data)
      .enter()
      .append("rect")
      .attr("class", "js-ref-data")
      .attr("fill", (d) => {

        const rgb = Math.round((d.variance + 6) / 12 * 255); //-6 to +6

        return `rgb(${rgb}, ${rgb}, ${rgb})`;

      })
      .attr("height", h / 12)
      .attr("transform", (d) => {

        const tx = w * (d.year - app.data[0].year) / app.data.length * 12;
        const ty = h * (d.month - 1) / 12;

        return `translate(${tx}, ${ty})`;

      })
      .attr("width", w / app.data.length * 12)
      .on("mouseenter", app.handleMouseEnter)
      .on("mouseleave", app.handleMouseLeave)
      .on("touchstart", checkTooltip(app), { passive: true });

  },

  //range

  svgRange(params) {

    const { w, h, chart } = params;

    const sw = w / 3;
    const sh = h / 24;

    //scale

    const scale = chart.append("rect")
      .attr("class", "c-scale js-ref-scale")
      .attr("height", sh)
      .attr("width", sw);

    scale.attr("transform", `translate(${w - sw}, ${h * 1.15})`);

    //ticks

    const s = d3.scaleOrdinal()
      .domain(["-6°C", "-3°C", "0°C", "+3°C", "+6°C"])
      .range([0, sw * 0.25, sw * 0.5, sw * 0.75, sw]);

    const sa = d3.axisBottom(s).ticks(3);

    chart.append("g")
      .attr("class", "c-axis")
      .attr("transform", `translate(${w - sw}, ${h * 1.175 + sh})`)
      .call(sa);

  }

};

//initialize app

app.getSVG = getSVG(app, svg, 2, ["svgMargin", "svgAxes", "svgChart", "svgData", "svgRange"]);

bindObject(app);

getJSON(app.dataURL).then(app.parseData);

select(document).on("DOMContentLoaded", globalEvents(app));
