"use strict";

//local imports

const { btnIDs } = require("./view-logic");

//gameplay events

const gameplayEvents = (app) => {
  btnIDs.forEach((e, i) => {
    $(`.js-click-btn-${e}`).click(app.playBtn(i));
  });
};

//setting events

const settingEvents = (app) => {
  $(".js-click-btn-steps").click(app.stepsBtn);
  $(".js-click-btn-start").click(app.startBtn);
  $(".js-click-btn-restart").click(app.restartBtn);
  $(".js-click-btn-strict").click(app.strictBtn);
};

//exports

module.exports = {
  gameplayEvents,
  settingEvents
};
