"use strict";

//local imports

const PollDisplay = require("../poll/poll-display");
const PollOptions = require("../poll/poll-options");
const ViewMenu = require("./view-menu");

const { newPoll } = require("../../../../../schemas");

//node modules

const React = require("react");

const { useEffect } = React;

//view

const View = (props) => {

  const { actions: { metaGetPolls, viewClearState }, data: { polls }, location } = props;

  const { jsx: { PollDisplay, PollOptions, ViewMenu } } = View.injected;

  //utilities

  const id = new URLSearchParams(location.search).get("id");

  //lifecycle

  useEffect(() => {

    viewClearState();

    if (id) {
      metaGetPolls(null, id);
    }

  }, []);

  //render

  const poll = polls.find((e) => e.id === id) || newPoll();

  const local = {
    poll,
    role: "view"
  };

  return (
    <div className="c-ui__view">
      <ViewMenu {...props} local={{ poll }} />
      <PollDisplay {...props} local={local} />
      <PollOptions {...props} local={local} />
    </div>
  );

};

View.propList = ["data.polls", "location"];

View.injected = {
  jsx: {
    PollDisplay,
    PollOptions,
    ViewMenu
  }
};

//exports

module.exports = View;
