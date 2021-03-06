"use strict";

//global imports

const { getJSON } = require("all/client-utils");
const { select } = require("all/dom-api");
const { bindObject } = require("all/utilities");
const { getSVG, tooltip } = require("d3/app-logic");
const { checkTooltip, globalEvents } = require("d3/event-handlers");
const { svgChart, svgParams, svgMargin } = require("d3/view-logic");

//node modules

const d3 = require("d3");

//utilities

const getYPos = (time) => {

  const range = 240; //seconds
  const start = 36; //minutes
  const minutes = Number(time.slice(0, 2));
  const seconds = Number(time.slice(3));

  return (range - ((minutes - start) * 60 + seconds)) / range;

};

//app logic

const app = {

  data: null,
  dataURL: "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",

  ready: 0,

  //tooltip

  tooltip,

  radius: null,

  handleMouseEnter(d) {

    select(d3.event.target).setAttribute("r", this.radius * 2);

    select(".js-edit-name").text(`${d.Name}, ${d.Nationality}`);
    select(".js-edit-rank").text(`Rank: ${d.Place}`);
    select(".js-edit-time").text(`Time: ${d.Time}`);
    select(".js-edit-year").text(`Year: ${d.Year}`);
    select(".js-edit-dope").text(d.Doping || "No evidence of doping");

    this.tooltip(true);

  },

  handleMouseLeave() {

    select(".js-ref-point").setAttribute("r", this.radius);

    this.tooltip();

  },

  //parse data

  parseData(res) {

    this.data = res.reverse();
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

    const x = d3.scalePoint()
      .domain(["40:00", "39:12", "38:24", "37:36", "36:48", "36:00"])
      .range([0, w]);
    const y = d3.scaleLinear()
      .domain([40, 0])
      .range([h, 0]);

    params.xa = d3.axisBottom(x);
    params.ya = d3.axisLeft(y);

  },

  //chart

  svgChart: svgChart("Time", "Rank"),

  //data

  svgData(params) {

    const { w, h, chart } = params;

    app.radius = h * 0.025;

    chart.selectAll("circle")
      .data(app.data)
      .enter()
      .append("circle")
      .attr("class", "js-ref-point")
      .attr("fill", (d) => d.Doping ? "white" : "black")
      .attr("r", app.radius)
      .attr("transform", (d) => `translate(${w * getYPos(d.Time)}, ${h * (d.Place / 40)})`)
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
