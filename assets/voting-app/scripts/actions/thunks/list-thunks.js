"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaAddErrors, metaSetState } = require("../factories/meta-factories");

//list submit search

const listSubmitSearch = () => (dispatch, getState) => {

  const { list } = getState();

  const empty = !list.search.trim();

  if (empty) {
    dispatch(metaAddErrors(["Nothing will come of nothing"]));
  } else {
    dispatch(metaSetState({
      list: {
        search: "",
        searched: list.search
      }
    }));
  }

};

//list toggle flag

const listToggleFlag = (id) => (dispatch) => reduxAPICall(dispatch, "/api/list-toggle-flag", { poll: id });

//list toggle hide

const listToggleHide = (id) => (dispatch) => reduxAPICall(dispatch, "/api/list-toggle-hide", { poll: id });

//exports

module.exports = {
  listSubmitSearch,
  listToggleFlag,
  listToggleHide
};
