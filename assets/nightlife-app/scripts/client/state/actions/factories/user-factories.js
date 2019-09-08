"use strict";

//user clear state

const userClearState = () => ({ type: "USER_CLEAR_STATE" });

//user set search

const userSetSearch = (search) => ({
  type: "USER_SET_SEARCH",
  search
});

//exports

module.exports = {
  userClearState,
  userSetSearch
};
