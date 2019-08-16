"use strict";

//local imports

const ListBody = require("./list-body");
const ListMenu = require("./list-menu");

const { getListParams } = require("../../../app-logic");
const { scrollInfo } = require("../../../view-logic");

//node modules

const React = require("react");

const { useLayoutEffect, useRef } = React;

//list

const List = (props) => {

  const { actions: { listClearState, metaGetPolls }, data: { polls }, location } = props;

  const { jsx: { ListBody, ListMenu }, lib: { scrollInfo, useRef } } = List.injected;

  //utilities

  const scrollRef = useRef();

  const resetList = async () => {

    listClearState();

    const { polls } = await metaGetPolls(getListParams(location));

    scrollRef.current = {
      end: polls.length < 100,
      pending: false
    };

  };

  //events

  const handleScroll = async () => {

    const { current: { end, pending } } = scrollRef;

    const { view, bottom } = scrollInfo();

    if (bottom > view * 3 || end || pending) {
      return;
    }

    scrollRef.current.pending = true;

    const res = await metaGetPolls(getListParams(location), null, polls.length);

    if (res.polls.length - polls.length < 100) {
      scrollRef.current.end = true;
    }

    scrollRef.current.pending = false;

  };

  //lifecycle

  useLayoutEffect(() => {
    resetList(); //async
  }, [location.search]);

  //render

  return (
    <div className="c-ui__list">
      <ListMenu {...props} />
      <ListBody {...props} local={{ handleScroll }} />
    </div>
  );

};

List.propList = ["data.polls", "location"];

List.injected = {
  jsx: {
    ListBody,
    ListMenu
  },
  lib: {
    scrollInfo,
    useRef
  }
};

//exports

module.exports = List;
