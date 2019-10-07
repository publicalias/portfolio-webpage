"use strict";

//local imports

const Poll = require("../poll/poll");
const ViewMenu = require("./view-menu");

const { newPoll } = require("../../../../../schemas");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//view

const View = (props) => {

  const { actions: { metaGetPollItem, viewClearState }, data: { polls }, local: { id } } = props;

  const { jsx: { Poll, ViewMenu } } = View.injected;

  //lifecycle

  useLayoutEffect(() => {
    viewClearState();
    metaGetPollItem(id);
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
      <Poll {...props} local={local} />
    </React.Fragment>
  );

};

View.propList = ["data.polls", "local"];

View.injected = {
  jsx: {
    Poll,
    ViewMenu
  }
};

//exports

module.exports = View;
