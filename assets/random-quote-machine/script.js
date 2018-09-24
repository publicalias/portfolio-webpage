"use strict";

//global imports

const { getJSON, wrapFn } = require("utilities");

//utilities

const display = (res) => {

  const href = `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(`"${res.quote}" ${res.author}`)}`;

  $(".js-edit-quote").text(res.quote);
  $(".js-edit-attr").text(res.author);
  $(".js-edit-twitter").attr("href", href);

  $(".js-fade-text").fadeIn();

};

//app logic

const refresh = (init) => {
  getJSON("http://quotes.stormconsultancy.co.uk/random.json").then((res) => {
    if (init) {
      display(res);
    } else {
      $(".js-fade-text").fadeOut(wrapFn(display, res));
    }
  });
};

//initialize app

$(() => {

  $(".js-click-refresh").click(wrapFn(refresh));

  refresh(true);

});
