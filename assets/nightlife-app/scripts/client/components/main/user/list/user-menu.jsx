"use strict";

//local imports

const { setUserParams } = require("../../../../app-logic");

//global imports

const Dropdown = require("all/components/dropdown");
const SearchBar = require("all/components/search-bar");

//node modules

const React = require("react");

//user menu

const UserMenu = (props) => {

  const {
    actions: { userSetSearch, userToggleRange },
    data: { users: { list: { menu } } },
    history,
    location
  } = props;

  const { jsx: { Dropdown, SearchBar } } = UserMenu.injected;

  //events

  const handleSearch = (key, val) => () => {
    history.push(`/users/list${setUserParams(location, key, val)}`);
  };

  const handleChange = (event) => {
    userSetSearch(event.target.value);
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

  return (
    <div className="c-list-menu">
      <SearchBar
        local={{
          handleChange,
          handleClear: handleSearch("search", ""),
          handleSubmit: handleSearch("search", menu.search),
          value: menu.search
        }}
      />
      <Dropdown
        local={{
          handleToggle: userToggleRange,
          list: rangeList,
          name: "Range",
          open: menu.range,
          util: "u-widget-width"
        }}
      />
    </div>
  );

};

UserMenu.propList = ["data.users.list.menu", "location"];

UserMenu.injected = {
  jsx: {
    Dropdown,
    SearchBar
  }
};

//exports

module.exports = UserMenu;
