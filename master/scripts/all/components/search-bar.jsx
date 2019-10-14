"use strict";

//global imports

const { select } = require("all/dom-api");
const { hookEvent } = require("all/react-utils");

//node modules

const React = require("react");

const { useEffect } = React;

//search bar

const SearchBar = (props) => {

  const { local: { handleChange, handleClear, handleSubmit, value } } = props;

  //lifecycle

  useEffect(() => hookEvent(select(".js-get-outline"), "blur focus", (event) => {
    select(".js-set-outline").css({ outline: event.type === "focus" ? "1px solid white" : "none" });
  }), []);

  //render

  return (
    <div className="c-search-bar js-set-outline">
      <input
        className="c-search-bar__input js-get-outline qa-search-input"
        maxLength="100"
        onChange={handleChange}
        placeholder="Search"
        value={value}
      />
      <button
        className="c-search-bar__submit js-get-outline qa-search-submit u-no-hover"
        onClick={handleSubmit}
      >
        <i className="fas fa-search" />
      </button>
      <button
        className="c-search-bar__clear js-get-outline qa-search-clear u-no-hover"
        onClick={handleClear}
      >
        <i className="fas fa-times" />
      </button>
    </div>
  );

};

SearchBar.propList = ["local"];

//exports

module.exports = SearchBar;
