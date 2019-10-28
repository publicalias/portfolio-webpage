"use strict";

//local imports

const MetaDropdown = require("../../meta/meta-dropdown");

const { setVenueParams } = require("../../../../app-logic");

//global imports

const SearchBar = require("all/components/search-bar");

//node modules

const React = require("react");

//venue menu

const VenueMenu = (props) => {

  const {
    actions: { venueSetSearch, venueToggleRange, venueToggleSort },
    data: { venues },
    history,
    location
  } = props;

  const { jsx: { MetaDropdown, SearchBar } } = VenueMenu.injected;

  //events

  const handleSearch = (key, val) => () => {
    history.push(`/venues/list${setVenueParams(location, key, val)}`);
  };

  const handleChange = (event) => {
    venueSetSearch(event.target.value);
  };

  //render

  return (
    <div className="c-list-menu">
      <SearchBar
        local={{
          handleChange,
          handleClear: handleSearch("search", ""),
          handleSubmit: handleSearch("search", venues.list.search),
          value: venues.list.search
        }}
      />
      <MetaDropdown
        local={{
          bool: venues.list.range,
          handleSelect: handleSearch,
          handleToggle: venueToggleRange,
          list: [
            ["05", "range", "05"],
            ["10", "range", "10"],
            ["15", "range", "15"],
            ["20", "range", "20"],
            ["25", "range", "25"]
          ],
          name: "Range"
        }}
      />
      <MetaDropdown
        local={{
          bool: venues.list.sort,
          handleSelect: handleSearch,
          handleToggle: venueToggleSort,
          list: [
            ["Match", "sort", "best_match"],
            ["Distance", "sort", "distance"],
            ["Rating", "sort", "rating"]
          ],
          name: "Sort By"
        }}
      />
    </div>
  );

};

VenueMenu.propList = ["data.venues", "location"];

VenueMenu.injected = {
  jsx: {
    MetaDropdown,
    SearchBar
  }
};

//exports

module.exports = VenueMenu;
