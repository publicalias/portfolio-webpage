"use strict";

//local imports

const ListBody = require("./list-body");
const ListMenu = require("./list-menu");

const { getListParams } = require("../../../app-logic");

//global imports

const { useInfiniteScroll, useRefresh } = require("redux/client-utils");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//list

const List = (props) => {

  const {
    actions: { listClearState, metaGetPollList },
    data: { loading, log, polls },
    location
  } = props;

  const { jsx: { ListBody, ListMenu }, lib: { useInfiniteScroll, useRefresh } } = List.injected;

  //utilities

  const fetch = (length) => metaGetPollList(getListParams(location), length);

  const { handleReload, handleScroll } = useInfiniteScroll(polls, "polls", 100, listClearState, fetch);

  //lifecycle

  const refresh = () => {
    fetch(polls.length);
  };

  useLayoutEffect(() => {
    handleReload(); //async
  }, [location.search]);

  useRefresh(refresh, loading, log, [
    "POLL_TOGGLE_FLAG",
    "POLL_TOGGLE_HIDE"
  ]);

  //render

  return (
    <React.Fragment>
      <ListMenu {...props} />
      <ListBody {...props} local={{ handleScroll }} />
    </React.Fragment>
  );

};

List.propList = ["data.loading", "data.log", "data.polls", "location"];

List.injected = {
  jsx: {
    ListBody,
    ListMenu
  },
  lib: {
    useInfiniteScroll,
    useRefresh
  }
};

//exports

module.exports = List;
