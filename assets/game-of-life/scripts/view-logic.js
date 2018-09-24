"use strict";

//global imports

const { array2DEach } = require("canvas-games");

//child props

const childProps = (that) => {

  const { start, reverse, rules, scale, gen, pop, rulesText, scaleText } = that.state;

  const display = [
    `Generation: ${gen}`,
    `Population: ${pop}`,
    `Rules: ${rules}`,
    `Scale: ${scale} x ${scale}`
  ];

  const control = [{
    setType: "button set",
    content: {
      a: {
        flex: "u-flex-2",
        fn: start ? that.handleStop : that.handleStart,
        text: start ? "Stop" : "Start"
      },
      b: {
        flex: "u-flex-3",
        fn: that.handleReverse,
        text: reverse ? "Forward" : "Reverse"
      }
    }
  }, {
    setType: "button",
    content: {
      a: {
        fn: that.handleIterate,
        text: "Iterate"
      }
    }
  }, {
    setType: "button set",
    content: {
      a: {
        flex: "u-flex-3",
        fn: that.handleSpeed,
        text: "Speed"
      },
      b: {
        flex: "u-flex-2",
        fn: that.handleColor,
        text: "Color"
      }
    }
  }, {
    setType: "button",
    content: {
      a: {
        fn: pop ? that.handleClear : that.handleRandom,
        text: pop ? "Clear" : "Random"
      }
    }
  }, {
    setType: "input",
    jsID: "rules",
    content: {
      a: {
        flex: "u-flex-2",
        fn: that.handleInput("rulesText"),
        text: "B3/S23",
        val: rulesText
      },
      b: {
        fn: that.handleRules,
        text: "Set"
      }
    }
  }, {
    setType: "button set",
    content: {
      a: {
        fn: that.handleSave,
        text: "Save"
      },
      b: {
        fn: that.handleLoad,
        text: "Load"
      }
    }
  }, {
    setType: "input",
    jsID: "scale",
    content: {
      a: {
        flex: "u-flex-2",
        fn: that.handleInput("scaleText"),
        text: "12 to 144",
        val: scaleText
      },
      b: {
        fn: that.handleScale,
        text: "Set"
      }
    }
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
