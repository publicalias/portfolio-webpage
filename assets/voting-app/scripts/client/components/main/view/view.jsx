"use strict";

//local imports

const ViewMenu = require("./view-menu");
const ViewOptions = require("./view-options");
const ViewPoll = require("./view-poll");

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
    data: { user, loading, log, view: { data } },
    local: { id }
  } = props;

  const { jsx: { ViewMenu, ViewOptions, ViewPoll }, lib: { useRefresh } } = View.injected;

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

  const poll = data.find((e) => e.id === id) || newPoll();

  const local = {
    bool: {
      canAdd: user.type === "auth" && Boolean(data.find((e) => e.id === poll.id)),
      hasOptions: poll.options.length > 0
    },
    poll
  };

  return (
    <React.Fragment>
      <ViewMenu {...props} local={{ poll }} />
      <ViewPoll local={local} />
      <ViewOptions {...props} local={local} />
    </React.Fragment>
  );

};

View.propList = ["data.user", "data.loading", "data.log", "data.view.data", "local"];

View.injected = {
  jsx: {
    ViewMenu,
    ViewOptions,
    ViewPoll
  },
  lib: { useRefresh }
};

//exports

module.exports = View;
