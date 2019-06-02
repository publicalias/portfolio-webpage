"use strict";

//global imports

const { submitKeys } = require("client-utils");
const { select } = require("dom-api");
const { hookEvent, useTeardown } = require("react-utils");

//node modules

const React = require("react");

//search bar

const SearchBar = (props) => {

  const { handleChange, handleClear, handleSubmit, value } = props;

  //lifecycle

  useTeardown(() => [

    submitKeys(),

    hookEvent(select(".js-get-outline"), "blur focus", (event) => {
      select(".js-set-outline").css({ outline: event.type === "focus" ? "1px solid white" : "none" });
    })

  ], []);

  //render

  return (
    <div className="c-search-bar js-set-outline">
      <input
        className="c-search-bar__input js-get-outline js-submit-input qa-search-input"
        maxLength="100"
        onChange={handleChange}
        placeholder="Search"
        value={value}
      />
      <button
        className="c-search-bar__submit js-get-outline js-submit-button qa-search-submit u-no-hover"
        onClick={handleSubmit}
      >
        <i className="fa fa-search" />
      </button>
      <button
        className="c-search-bar__clear js-get-outline qa-search-clear u-no-hover"
        onClick={handleClear}
      >
        <i className="fa fa-close" />
      </button>
    </div>
  );

};

//exports

module.exports = SearchBar;
