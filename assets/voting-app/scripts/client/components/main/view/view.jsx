"use strict";

//local imports

const Poll = require("../poll/poll");
const ViewMenu = require("./view-menu");

const { newPoll } = require("../../../../../schemas");

//global imports

const { useRefresh } = require("redux/client-utils");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//view

const View = (props) => {

  const {
    actions: { metaGetPollItem, viewClearState },
    data: { loading, log, polls },
    local: { id }
  } = props;

  const { jsx: { Poll, ViewMenu }, lib: { useRefresh } } = View.injected;

  //lifecycle

  const refresh = () => metaGetPollItem(id);

  useLayoutEffect(() => {
    viewClearState();
    refresh();
  }, []);

  useRefresh(refresh, loading, log, [
    "POLL_ADD_OPTION",
    "POLL_CAST_VOTE",
    "POLL_REMOVE_OPTION",
    "POLL_REMOVE_VOTE",
    "POLL_TOGGLE_FLAG",
    "POLL_TOGGLE_HIDE",
    "POLL_TOGGLE_SECRET"
  ]);

  //render

  const poll = polls.find((e) => e.id === id) || newPoll();

  const local = {
    poll,
    role: "view"
  };

  return (
    <React.Fragment>
      <ViewMenu {...props} local={{ poll }} />
      <Poll {...props} local={local} />
    </React.Fragment>
  );

};

View.propList = ["data.loading", "data.log", "data.polls", "local"];

View.injected = {
  jsx: {
    Poll,
    ViewMenu
  },
  lib: { useRefresh }
};

//exports

module.exports = View;
