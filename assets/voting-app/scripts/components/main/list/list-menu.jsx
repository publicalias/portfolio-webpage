"use strict";

//local imports

const { setListParams } = require("../../../app-logic");

//global imports

const SearchBar = require("components/search-bar");

//node modules

const React = require("react");

//list menu

const ListMenu = (props) => {

  const { actions: { listSetSearch }, data: { list }, history, location } = props;

  //events

  const handleSortNew = () => {
    history.push(`/list${setListParams(location, "sort", "new")}`);
  };

  const handleSortPopular = () => {
    history.push(`/list${setListParams(location, "sort", "popular")}`);
  };

  //render

  const childProps = {

    handleChange(event) {
      listSetSearch(event.target.value);
    },

    handleClear() {
      history.push(`/list${setListParams(location, "search", "")}`);
    },

    handleSubmit() {
      history.push(`/list${setListParams(location, "search", list.search)}`);
    },

    id: "search",
    value: list.search

  };

  return (
    <div className="c-list-menu">
      <div className="c-list-menu__search">
        <SearchBar {...childProps} />
      </div>
      <div className="c-list-menu__sort">
        <button className="qa-sort-new u-hover" onClick={handleSortNew}>New</button>
      </div>
      <div className="c-list-menu__sort u-no-margin">
        <button className="qa-sort-popular u-hover" onClick={handleSortPopular}>Popular</button>
      </div>
    </div>
  );

};

//exports

module.exports = ListMenu;
