"use strict";

/*global topojson*/

//local imports

const { pointRadius, scrubData } = require("./scripts/app-logic");
const { rotateHandlers } = require("./scripts/event-handlers");
const { tooltipAddress, tooltipHandler } = require("./scripts/view-logic");

//global imports

const { getSVG, tooltip } = require("d3-projects/app-logic");
const { checkTooltip, globalEvents } = require("d3-projects/event-handlers");
const { select } = require("dom-api");
const { bindObject, getJSON } = require("utilities");

//app logic

const app = {

  data: null,
  dataURL: "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json",
  land: null,
  landURL: "https://unpkg.com/world-atlas@1.1.4/world/110m.json",

  mean: null,

  ready: 0,

  //tooltip

  tooltip,

  async handleMouseEnter(d) {

    const { address, reclat, reclong } = d.properties;

    const node = d3.event.target;

    if (address) {
      tooltipHandler(d, node, this.tooltip);
    } else {

      const res = await getJSON(`/orthographic-projection/address?lat=${reclat}&lon=${reclong}`);

      tooltipAddress(d, res);
      tooltipHandler(d, node, this.tooltip);

    }

  },

  handleMouseLeave() {

    select(".js-ref-data").class("is-active", true, false);

    this.tooltip();

  },

  //parse data

  parseData(res) {

    this.data = [];
    this.mean = [];

    scrubData(res, this.data, this.mean);

    this.mean = d3.mean(this.mean);

    this.ready++;

    this.getSVG();

  },

  //parse land

  parseLand(res) {

    this.land = topojson.feature(res, res.objects.land);

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
      fo: null,
      bo: null,
      fp: null,
      bp: null,
      chart: null
    };
  },

  //ortho

  svgOrtho(params) {

    const { w, h } = params;

    params.fo = d3.geoOrthographic()
      .clipAngle(90)
      .translate([w / 2, h / 2])
      .scale(w * 0.485);
    params.bo = d3.geoOrthographic()
      .clipAngle(180)
      .translate([w / 2, h / 2])
      .scale(w * 0.485);

    const { fo, bo } = params;

    params.fp = d3.geoPath(fo).pointRadius(pointRadius(w, app.mean));
    params.bp = d3.geoPath(bo);

  },

  //chart

  svgChart(params) {

    const { w, h } = params;

    params.chart = d3.select(".js-render-chart")
      .append("g")
      .attr("height", h)
      .attr("width", w);

  },

  //data

  svgData(params) {

    const { bp, fp, chart } = params;

    //land

    chart.append("g")
      .append("path")
      .datum(app.land)
      .attr("class", "c-land--back js-rotate-back")
      .attr("d", bp);

    chart.append("g")
      .append("path")
      .datum(app.land)
      .attr("class", "c-land--front js-rotate-front")
      .attr("d", fp);

    //data

    chart.append("g")
      .selectAll("path")
      .data(app.data)
      .enter()
      .append("path")
      .attr("class", "c-point js-ref-data js-rotate-front")
      .attr("d", fp)
      .on("mouseenter", app.handleMouseEnter)
      .on("mouseleave", app.handleMouseLeave)
      .on("touchstart", checkTooltip(app), { passive: true });

  },

  //rotate

  svgRotate(params) {

    const rotate = rotateHandlers(params, app.handleMouseLeave);

    bindObject(rotate);

    for (const e of rotate.ids) {
      select(`.js-click-${e}`).on("click", () => {
        if (rotate.int) {
          rotate.pause();
        } else if (e === "reset") {
          rotate.reset();
        } else {
          rotate.int = setInterval(rotate[e], 100);
        }
      });
    }

  }

};

//initialize app

app.getSVG = getSVG(app, svg, 3, ["svgOrtho", "svgChart", "svgData", "svgRotate"]);

bindObject(app);

getJSON(app.dataURL).then(app.parseData);
getJSON(app.landURL).then(app.parseLand);

select(document).on("DOMContentLoaded", globalEvents(app));
