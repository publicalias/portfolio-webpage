"use strict";

//global imports

const { array2DEach } = require("react-projects/app-logic");

//child props

const childProps = (state, handlers) => {

  const { start, reverse, rules, scale, gen, pop, rulesText, scaleText } = state;

  const display = [
    `Generation: ${gen}`,
    `Population: ${pop}`,
    `Rules: ${rules}`,
    `Scale: ${scale} x ${scale}`
  ];

  const control = [{
    setType: "button set",
    content: [{
      flex: "u-flex-2",
      fn: start ? handlers.stop : handlers.start,
      text: start ? "Stop" : "Start"
    }, {
      flex: "u-flex-3",
      fn: handlers.reverse,
      text: reverse ? "Forward" : "Reverse"
    }]
  }, {
    setType: "button",
    content: [{
      fn: handlers.iterate,
      text: "Iterate"
    }]
  }, {
    setType: "button set",
    content: [{
      flex: "u-flex-3",
      fn: handlers.speed,
      text: "Speed"
    }, {
      flex: "u-flex-2",
      fn: handlers.color,
      text: "Color"
    }]
  }, {
    setType: "button",
    content: [{
      fn: pop ? handlers.clear : handlers.random,
      text: pop ? "Clear" : "Random"
    }]
  }, {
    setType: "input",
    jsID: "rules",
    content: [{
      flex: "u-flex-2",
      fn: handlers.input("rulesText"),
      text: "B3/S23",
      val: rulesText
    }, {
      fn: handlers.rules,
      text: "Set"
    }]
  }, {
    setType: "button set",
    content: [{
      fn: handlers.save,
      text: "Save"
    }, {
      fn: handlers.load,
      text: "Load"
    }]
  }, {
    setType: "input",
    jsID: "scale",
    content: [{
      flex: "u-flex-2",
      fn: handlers.input("scaleText"),
      text: "12 to 144",
      val: scaleText
    }, {
      fn: handlers.scale,
      text: "Set"
    }]
  }];

  return {
    display,
    control
  };

};

//clear canvas

const clearCanvas = (params) => {

  const { ctx, w, h, color } = params;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = color[0];
  ctx.fillRect(0, 0, w, h);

};

//paint canvas

const paintCanvas = (params, culture) => {

  const { ctx, w, color } = params;

  const scale = w / culture.length;

  array2DEach(culture, (e, i, f, j) => {
    if (f) {
      ctx.beginPath();
      ctx.arc(scale / 2 + scale * j, scale / 2 + scale * i, scale / 2, 0, Math.PI * 2);
      ctx.fillStyle = color[f];
      ctx.fill();
    }
  });

};

//exports

module.exports = {
  childProps,
  clearCanvas,
  paintCanvas
};
