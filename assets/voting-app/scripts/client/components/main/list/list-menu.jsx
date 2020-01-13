"use strict";

//local imports

const { setListParams } = require("../../../app-logic");

//global imports

const SearchBar = require("all/components/search-bar");

//node modules

const React = require("react");

//list menu

const ListMenu = (props) => {

  const { actions: { listSetSearch }, data: { list: { menu } }, history, location } = props;

  const { jsx: { SearchBar } } = ListMenu.injected;

  //events

  const handleChange = (event) => {
    listSetSearch(event.target.value);
  };

  const handleSearch = (key, val) => () => {
    history.push(`/list${setListParams(location, key, val)}`);
  };

  //render

  return (
    <div className="c-list-menu">
      <div className="c-list-menu__search">
        <SearchBar
          local={{
            handleChange,
            handleClear: handleSearch("search", ""),
            handleSubmit: handleSearch("search", menu.search),
            value: menu.search
          }}
        />
      </div>
      <div className="c-list-menu__sort">
        <button className="qa-sort-new" onClick={handleSearch("sort", "new")}>New</button>
        <button className="qa-sort-popular" onClick={handleSearch("sort", "popular")}>Popular</button>
      </div>
    </div>
  );

};

ListMenu.propList = ["data.list.menu", "location"];

ListMenu.injected = { jsx: { SearchBar } };

//exports

module.exports = ListMenu;
