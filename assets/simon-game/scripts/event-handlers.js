"use strict";

//local imports

const { btnIDs } = require("./view-logic");

//global imports

const { select } = require("dom-api");

//gameplay events

const gameplayEvents = (app) => {
  btnIDs.forEach((e, i) => {
    select(`.js-click-${e}`).on("click", app.playBtn(i));
  });
};

//setting events

const settingEvents = (app) => {

  const buttons = [{
    id: "steps",
    fn: app.stepsBtn
  }, {
    id: "start",
    fn: app.startBtn
  }, {
    id: "restart",
    fn: app.restartBtn
  }, {
    id: "strict",
    fn: app.strictBtn
  }];

  for (const e of buttons) {
    select(`.js-click-${e.id}`).on("click", e.fn);
  }

};

//exports

module.exports = {
  gameplayEvents,
  settingEvents
};
