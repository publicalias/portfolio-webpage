"use strict";

//local imports

const ListBody = require("./list-body");
const ListMenu = require("./list-menu");

const { getListParams } = require("../../../app-logic");
const { scrollInfo } = require("../../../view-logic");

//global imports

const { select } = require("dom-api");

//node modules

const React = require("react");

const { useEffect, useRef } = React;

//list

const List = (props) => {

  const { actions: { listClearState, metaGetPolls }, data: { polls }, location } = props;

  const { injected: { scrollInfo, select, useRef } } = List;

  //utilities

  const scrollRef = useRef();

  const resetList = async () => {

    await metaGetPolls(getListParams(location));

    listClearState();

    select(".js-scroll-view").scrollTop = 0;

    scrollRef.current = {
      end: false,
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

  useEffect(() => {
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

List.injected = {
  scrollInfo,
  select,
  useRef
};

//exports

module.exports = List;
