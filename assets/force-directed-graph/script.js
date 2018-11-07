"use strict";

//local imports

const { tooltipBorders, nodeAttr } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("check-input");
const { getSVG, tooltip } = require("d3-projects/app-logic");
const { checkTooltip, globalEvents } = require("d3-projects/event-handlers");
const { select } = require("dom-api");
const { bindObject, getJSON } = require("utilities");

//app logic

const app = {

  data: null,
  dataURL: "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
  reset: null,

  ready: 0,

  //tooltip

  toggled: true,

  toggle() {

    this.toggled = !this.toggled;

    $(".js-edit-toggle").text(this.toggled ? "On" : "Off");

  },

  tooltip(bool) {
    tooltip(this.toggled && bool);
  },

  handleMouseEnter(d) {

    $(".js-edit-country").text(d.country);
    $(".js-edit-borders").text(tooltipBorders(d, this.data));

    select(`.js-ref-data-${d.code}`).class("is-active", true, true);

    this.tooltip(true);

  },

  handleMouseLeave() {

    select(".js-ref-data").class("is-active", true, false);

    this.tooltip();

  },

  //parse data

  parseData(res) {

    this.data = res;
    this.ready++;

    this.getSVG();

  }

};

//svg logic

const svg = {

  //params

  svgParams() {
    return {
      w: 450,
      h: 450,
      nw: null,
      nh: null,
      chart: null,
      edge: null,
      node: null
    };
  },

  //node scale

  svgNodeScale(params) {

    const { w, h } = params;

    params.nw = w * 0.024;
    params.nh = h * 0.016;

  },

  //chart

  svgChart(params) {

    const { w, h } = params;

    params.chart = d3.select(".js-render-chart")
      .append("g")
      .attr("width", w)
      .attr("height", h);

  },

  //data

  svgData(params) {

    const { nw, nh, chart } = params;

    //edges

    params.edge = chart.append("g")
      .selectAll("line")
      .data(app.data.links)
      .enter()
      .append("line")
      .attr("class", (d) => `
        js-ref-data
        js-ref-data-${app.data.nodes[d.source].code}
        js-ref-data-${app.data.nodes[d.target].code}
      `);

    //nodes

    params.node = chart.append("g")
      .selectAll("image")
      .data(app.data.nodes)
      .enter()
      .append("image")
      .attr("class", "c-node")
      .attr("height", nh)
      .attr("width", nw)
      .attr("xlink:href", (d) => `media/${d.code}.svg`)
      .on("mouseenter", app.handleMouseEnter)
      .on("mouseleave", app.handleMouseLeave)
      .on("touchstart", checkTooltip(app), { passive: true });

  },

  //force sim

  svgForceSim(params) {

    const { w, h, nw, nh, edge, node } = params;

    const manyBody = d3.forceManyBody()
      .distanceMax(nw * 10)
      .strength(Math.pow(nw, 2) / -10);

    const sim = d3.forceSimulation(app.data.nodes)
      .force("body", manyBody)
      .force("center", d3.forceCenter(w / 2, h / 2))
      .force("collision", d3.forceCollide(nw))
      .force("link", d3.forceLink(app.data.links))
      .stop();

    for (let i = 0; i < 300; i++) {
      sim.tick();
    }

    edge.attr("x1", (d) => d.source.x)
      .attr("x2", (d) => d.target.x)
      .attr("y1", (d) => d.source.y)
      .attr("y2", (d) => d.target.y);

    node.attr("x", nodeAttr(nw, w, "x")).attr("y", nodeAttr(nh, h, "y"));

  }

};

//initialize app

app.getSVG = getSVG(app, svg, 2, ["svgNodeScale", "svgChart", "svgData", "svgForceSim"]);

bindObject(app);

getJSON(app.dataURL).then(app.parseData);

select(document).on("DOMContentLoaded", () => {

  checkInput();

  globalEvents(app)();
  select(".js-click-toggle").on("click", app.toggle);

});
