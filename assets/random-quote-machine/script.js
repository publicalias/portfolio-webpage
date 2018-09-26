"use strict";

//global imports

const { bindObject, getJSON, rngInt, wrapFn } = require("utilities");

//utilities

const display = (res) => {

  const href = `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(`"${res.quote}" ${res.author}`)}`;

  $(".js-edit-quote").text(res.quote);
  $(".js-edit-attr").text(res.author);
  $(".js-edit-twitter").attr("href", href);

  $(".js-fade-text").fadeIn();

};

//app logic

const app = {

  data: null,

  ready: 0,

  //refresh

  refresh(init) {

    if (this.ready < 2) {
      return;
    }

    const next = this.data[rngInt(0, this.data.length)];

    if (init) {
      display(next);
    } else {
      $(".js-fade-text").fadeOut(wrapFn(display, next));
    }

  }

};

//initialize app

bindObject(app);

getJSON("media/quotes.json").then((res) => {

  app.data = res;

  app.ready++;
  app.refresh(true);

});

$(() => {

  $(".js-click-refresh").click(wrapFn(app.refresh));

  app.ready++;
  app.refresh(true);

});
