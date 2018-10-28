"use strict";

//global imports

const { checkInput } = require("check-input");
const { animate, listen } = require("dom-utils");
const { bindObject, getJSON, rngInt, wrapFn } = require("utilities");

//utilities

const display = (next, init) => {

  const href = `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(`"${next.quote}" ${next.author}`)}`;

  $(".js-edit-quote").text(next.quote);
  $(".js-edit-attr").text(next.author);
  $(".js-edit-twitter").attr("href", href);

  if (!init) {
    animate(".js-fade-text", { opacity: 1 });
  }

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
      display(next, init);
    } else {
      animate(".js-fade-text", { opacity: 0 }, () => {
        display(next);
      });
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

listen(document, "DOMContentLoaded", () => {

  checkInput();

  listen(".js-click-refresh", "click", wrapFn(app.refresh));

  app.ready++;
  app.refresh(true);

});
