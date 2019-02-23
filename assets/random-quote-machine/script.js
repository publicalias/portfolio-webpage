"use strict";

//global imports

const { bindObject, checkInput, getJSON } = require("client-utils");
const { select } = require("dom-api");
const { rngInt, wrapFn } = require("utilities");

//utilities

const display = (next, init) => {

  const href = `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(`"${next.quote}" ${next.author}`)}`;

  select(".js-edit-quote").text(next.quote);
  select(".js-edit-attr").text(next.author);

  select(".js-edit-twitter").href = href;

  if (!init) {
    select(".js-fade-text").animate({ opacity: 1 });
  }

};

//app logic

const app = {

  data: null,
  last: null,

  ready: 0,

  //refresh

  refresh(init) {

    if (this.ready < 2) {
      return;
    }

    const next = this.data[rngInt(0, this.data.length)];

    if (next === this.last) {

      this.refresh();

      return;

    }

    this.last = next;

    if (init) {
      display(next, init);
    } else {
      select(".js-fade-text").animate({ opacity: 0 }, wrapFn(display, next));
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

select(document).on("DOMContentLoaded", () => {

  checkInput();

  select(".js-click-refresh").on("click", wrapFn(app.refresh));

  app.ready++;
  app.refresh(true);

});
