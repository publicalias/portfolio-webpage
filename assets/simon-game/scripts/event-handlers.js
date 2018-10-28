"use strict";

//local imports

const { btnIDs } = require("./view-logic");

//global imports

const { listen } = require("dom-utils");

//gameplay events

const gameplayEvents = (app) => {
  btnIDs.forEach((e, i) => {
    listen(`.js-click-btn-${e}`, "click", app.playBtn(i));
  });
};

//setting events

const settingEvents = (app) => {
  listen(".js-click-btn-steps", "click", app.stepsBtn);
  listen(".js-click-btn-start", "click", app.startBtn);
  listen(".js-click-btn-restart", "click", app.restartBtn);
  listen(".js-click-btn-strict", "click", app.strictBtn);
};

//exports

module.exports = {
  gameplayEvents,
  settingEvents
};
