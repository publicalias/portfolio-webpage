"use strict";

//local imports

const PollDisplay = require("../poll/poll-display");
const PollOptions = require("../poll/poll-options");
const ViewMenu = require("./view-menu");

const { newPoll } = require("../../../../../schemas");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//view

const View = (props) => {

  const { actions: { metaGetPolls, viewClearState }, data: { polls }, local: { id } } = props;

  const { jsx: { PollDisplay, PollOptions, ViewMenu } } = View.injected;

  //lifecycle

  useLayoutEffect(() => {
    viewClearState();
    metaGetPolls(null, id);
  }, []);

  //render

  const poll = polls.find((e) => e.id === id) || newPoll();

  const local = {
    poll,
    role: "view"
  };

  return (
    <React.Fragment>
      <ViewMenu {...props} local={{ poll }} />
      <PollDisplay {...props} local={local} />
      <PollOptions {...props} local={local} />
    </React.Fragment>
  );

};

View.propList = ["data.polls", "local"];

View.injected = {
  jsx: {
    PollDisplay,
    PollOptions,
    ViewMenu
  }
};

//exports

module.exports = View;
