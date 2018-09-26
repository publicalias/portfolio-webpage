"use strict";

/*global topojson*/

//local imports

const { pointRadius, scrubData } = require("./scripts/app-logic");
const { rotateHandlers } = require("./scripts/event-handlers");
const { tooltipText } = require("./scripts/view-logic");

//global imports

const { getSVG, tooltip } = require("d3-projects/app-logic");
const { windowEvents, checkTooltip } = require("d3-projects/event-handlers");
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

  handleMouseEnter(d) {

    const { reclat, reclong } = d.properties;

    const node = d3.event.target;

    getJSON(`/orthographic-projection/address?lat=${reclat}&lon=${reclong}`).then(tooltipText(d, node, this.tooltip));

  },

  handleMouseLeave() {
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
      .attr("class", "c-point js-rotate-front")
      .attr("d", fp)
      .on("mouseenter", app.handleMouseEnter)
      .on("mouseleave", app.handleMouseLeave)
      .on("click", checkTooltip(app));

  },

  //rotate

  svgRotate(params) {

    const rotate = rotateHandlers(params, app.tooltip);

    bindObject(rotate);

    for (const e of rotate.ids) {
      $(`.js-click-${e}`).click(() => {
        if (e === "center") {
          rotate[e]();
        } else if (!rotate.int) {
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

$(windowEvents(app));
