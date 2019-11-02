"use strict";

//local imports

const ListBody = require("./list-body");
const ListMenu = require("./list-menu");

const { getListParams } = require("../../../app-logic");

//global imports

const { useInfiniteScroll } = require("redux/client-utils");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//list

const List = (props) => {

  const { actions: { listClearState, metaGetPollList }, data: { polls }, location } = props;

  const { jsx: { ListBody, ListMenu }, lib: { useInfiniteScroll } } = List.injected;

  //utilities

  const fetch = (length) => metaGetPollList(getListParams(location), length);

  const { handleReload, handleScroll } = useInfiniteScroll(polls, "polls", 100, listClearState, fetch);

  //lifecycle

  useLayoutEffect(() => {
    handleReload(); //async
  }, [location.search]);

  //render

  return (
    <React.Fragment>
      <ListMenu {...props} />
      <ListBody {...props} local={{ handleScroll }} />
    </React.Fragment>
  );

};

List.propList = ["data.polls", "location"];

List.injected = {
  jsx: {
    ListBody,
    ListMenu
  },
  lib: { useInfiniteScroll }
};

//exports

module.exports = List;
