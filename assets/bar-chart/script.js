"use strict";

//global imports

const { getSVG, tooltip } = require("d3-projects/app-logic");
const { checkTooltip, globalEvents } = require("d3-projects/event-handlers");
const { svgChart, svgParams, svgMargin } = require("d3-projects/view-logic");
const { select } = require("dom-api");
const { bindObject, getJSON } = require("utilities");

//app logic

const app = {

  data: null,
  dataURL: "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",

  ready: 0,

  //tooltip

  tooltip(bool) {
    if (bool) {

      const thisRect = select(d3.event.target).getBoundingClientRect();
      const svgRect = select(".js-ref-svg").getBoundingClientRect();

      tooltip(bool, null, thisRect.top + svgRect.height * 0.2);

    } else {
      tooltip(bool);
    }
  },

  handleMouseEnter(d) {

    select(".js-edit-gdp").text(`${d[1]}e+12`);
    select(".js-edit-quarter").text(d[0]);

    select(d3.event.target).class("is-active", true, true);

    this.tooltip(true);

  },

  handleMouseLeave() {

    select(".js-ref-data").class("is-active", true, false);

    this.tooltip();

  },

  //parse data

  parseData(res) {

    const dates = {
      "01": "Jan",
      "04": "Apr",
      "07": "Jul",
      "10": "Oct"
    };

    this.data = res.data.slice(32, 272); //representative segment

    for (const e of this.data) {

      //quarter

      e[0] = e[0].split("-").reverse();
      e[0][1] = dates[e[0][1]];
      e[0] = e[0].join(" ");

      //gdp

      e[1] = (e[1] / 1000).toFixed(3);

    }

    this.ready++;

    this.getSVG();

  }

};

//svg logic

const svg = {

  //params

  svgParams,

  //margin

  svgMargin,

  //axes

  svgAxes(params) {

    const { w, h } = params;

    const xs = d3.scaleLinear()
      .domain([1955, 2015])
      .range([0, w]);
    const ys = d3.scaleLinear()
      .domain([0, 18])
      .range([h, 0]);

    params.xa = d3.axisBottom(xs).tickValues([1955, 1975, 1995, 2015]);
    params.ya = d3.axisLeft(ys).tickValues([0, 3, 6, 9, 12, 15, 18]);

  },

  //chart

  svgChart: svgChart("Year", "GDP (1e+12 USD)"),

  //data

  svgData(params) {

    const { w, h, chart } = params;

    const createBars = (id) => chart.selectAll(`.${id}`)
      .data(app.data)
      .enter()
      .append("rect")
      .attr("class", id);

    createBars("c-bar")
      .attr("height", (d) => h * Number(d[1]) / 18)
      .attr("transform", (d, i) => `translate(${w / app.data.length * i}, ${h - h * Number(d[1]) / 18})`)
      .attr("width", w / app.data.length + 1);

    createBars("c-bar--hover js-ref-data")
      .attr("height", () => h)
      .attr("transform", (d, i) => `translate(${w / app.data.length * i}, 0)`)
      .attr("width", w / app.data.length)
      .on("mouseenter", app.handleMouseEnter)
      .on("mouseleave", app.handleMouseLeave)
      .on("touchstart", checkTooltip(app), { passive: true });

  }

};

//initialize app

app.getSVG = getSVG(app, svg, 2, ["svgMargin", "svgAxes", "svgChart", "svgData"]);

bindObject(app);

getJSON(app.dataURL).then(app.parseData);

select(document).on("DOMContentLoaded", globalEvents(app));
