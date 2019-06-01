"use strict";

//global imports

const { submitKeys } = require("client-utils");
const { select } = require("dom-api");

//node modules

const React = require("react");

const { useEffect } = React;

//search bar

const SearchBar = (props) => {

  const { handleChange, handleClear, handleSubmit, value } = props;

  //lifecycle

  useEffect(() => {

    const DOMInput = select(".js-get-outline");

    const toggleOutline = (event) => {
      select(".js-set-outline").css({ outline: event.type === "focus" ? "1px solid white" : "none" });
    };

    const teardown = submitKeys();

    DOMInput.on("blur focus", toggleOutline);

    return () => {

      teardown();

      DOMInput.off("blur focus", toggleOutline);

    };

  }, []);

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
