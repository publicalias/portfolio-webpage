"use strict";

//global imports

const { toggleModal } = require("modal");

//render results

const renderResults = (res) => {

  const [input, titles, bodies, links] = res;

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

  $(".js-render-output")
    .empty()
    .append(results);

  toggleModal(true);

};

//toggle outline

const toggleOutline = (event) => {
  $(".js-outline-search-bar").css({ outline: event.type === "focus" ? "1px solid white" : "none" });
};

//exports

module.exports = {
  renderResults,
  toggleOutline
};
