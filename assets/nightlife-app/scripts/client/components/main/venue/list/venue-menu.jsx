"use strict";

//local imports

const { setVenueParams } = require("../../../../app-logic");

//global imports

const Dropdown = require("all/components/dropdown");
const SearchBar = require("all/components/search-bar");

//node modules

const React = require("react");

//venue menu

const VenueMenu = (props) => {

  const {
    actions: { venueSetSearch, venueToggleRange, venueToggleSort },
    data: { venues: { list } },
    history,
    location
  } = props;

  const { jsx: { Dropdown, SearchBar } } = VenueMenu.injected;

  //events

  const handleSearch = (key, val) => () => {
    history.push(`/venues/list${setVenueParams(location, key, val)}`);
  };

  const handleChange = (event) => {
    venueSetSearch(event.target.value);
  };

  //render

  const initList = (list) => list.map(([text, key, val]) => ({
    handleClick: handleSearch(key, val),
    text
  }));

  const rangeList = initList([
    ["5 Miles", "range", "5"],
    ["10 Miles", "range", "10"],
    ["15 Miles", "range", "15"],
    ["20 Miles", "range", "20"],
    ["25 Miles", "range", "25"]
  ]);

  const sortList = initList([
    ["Match", "sort", "best_match"],
    ["Distance", "sort", "distance"],
    ["Rating", "sort", "rating"]
  ]);

  return (
    <div className="c-list-menu">
      <SearchBar
        local={{
          handleChange,
          handleClear: handleSearch("search", ""),
          handleSubmit: handleSearch("search", list.search),
          value: list.search
        }}
      />
      <Dropdown
        local={{
          handleToggle: venueToggleRange,
          list: rangeList,
          name: "Range",
          open: list.range,
          util: "u-dropdown-width"
        }}
      />
      <Dropdown
        local={{
          handleToggle: venueToggleSort,
          list: sortList,
          name: "Sort By",
          open: list.sort,
          util: "u-dropdown-width"
        }}
      />
    </div>
  );

};

VenueMenu.propList = ["data.venues.list", "location"];

VenueMenu.injected = {
  jsx: {
    Dropdown,
    SearchBar
  }
};

//exports

module.exports = VenueMenu;
