"use strict";

//global imports

const { select } = require("dom-api");

//rotate handlers

const rotateHandlers = (params, tooltip) => {

  const { w, h, bo, fo, bp, fp, chart } = params;

  const xs = d3.scaleLinear()
    .domain([0, w])
    .range([-180, 180]);
  const ys = d3.scaleLinear()
    .domain([0, h])
    .range([90, -90]);

  return {

    int: null,
    ids: ["up", "down", "left", "right", "reset"],

    xc: w / 2,
    yc: h / 2,

    //pause

    pause() {
      clearInterval(this.int);
      this.int = null;
    },

    //rotate

    rotate() {

      fo.rotate([xs(this.xc), ys(this.yc)]);
      chart.selectAll(".js-rotate-front").attr("d", fp);
      bo.rotate([xs(this.xc), ys(this.yc)]);
      chart.selectAll(".js-rotate-back").attr("d", bp);

      tooltip();

    },

    //int

    up() {
      this.yc += h * 0.02;
      this.rotate();
    },

    down() {
      this.yc -= h * 0.02;
      this.rotate();
    },

    left() {
      this.xc += w * 0.01;
      this.rotate();
    },

    right() {
      this.xc -= w * 0.01;
      this.rotate();
    },

    //reset

    reset() {
      this.xc = w / 2;
      this.yc = h / 2;
      this.rotate();
    }

  };

};

//tooltip handler

const tooltipMass = (mass) => {

  if (mass >= 1000) {
    return `${mass / 1000}t`;
  } else if (mass < 1) {
    return `${mass * 1000}g`;
  }

  return `${mass}kg`;

};

const tooltipHandler = (d, node, tooltip) => {

  //check current node

  const DOMHover = select(":hover");

  if (DOMHover.all[DOMHover.all.length - 1] !== node) {
    return;
  }

  //display tooltip

  const { properties: { address, mass, name, recclass } } = d;

  select(".js-edit-name").text(name);
  select(".js-edit-mass").text(tooltipMass(mass));
  select(".js-edit-class").text(`${recclass} class`);
  select(".js-edit-address").text(address);

  select(node).class("is-active", true, true);

  tooltip(true, node);

};

//exports

module.exports = {
  rotateHandlers,
  tooltipHandler
};
