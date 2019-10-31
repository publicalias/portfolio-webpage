"use strict";

//global imports

const { toggleModal } = require("all/components/modal");
const { select } = require("all/dom-api");

//render results

const renderResults = ([input, titles, bodies, links]) => {

  let results = [`
    <h2 class="u-align-center">Search results for "${input}"</h2>
    <hr>
  `];

  const list = links.map((e, i, arr) => {

    const margin = i < arr.length - 1 ? "u-margin-full" : "";

    return `
      <div class="c-search-result ${margin}">
        <a class="c-search-result__link js-close-modal" href="${e}" target="iframe-viewer">
          <blockquote class="c-search-result__block">
            <h5 class="c-search-result__title u-margin-half">${titles[i]}</h5>
            <p class="c-search-result__text">${bodies[i]}</p>
          </blockquote>
        </a>
      </div>
    `;

  });

  const empty = "<h5>No results found</h5>";

  results = results.concat(list.length ? list : empty);

  select(".js-render-output").html(results.join(""));

  toggleModal(true);

};

//toggle outline

const toggleOutline = (event) => {
  select(".js-set-outline").css({ outline: event.type === "focus" ? "1px solid white" : "none" });
};

//exports

module.exports = {
  renderResults,
  toggleOutline
};
