"use strict";

//local imports

const ViewMenu = require("./view-menu");

//global imports

const { newPoll } = require("schemas/voting-app");

//node modules

const React = require("react");

const { useEffect } = React;

//view

const View = (props) => {

  const { actions: { metaGetPolls, viewClearState }, data: { polls }, location } = props;

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

  return (
    <div className="c-ui__view">
      <ViewMenu {...props} poll={poll} />
      <div className="c-poll-display" />
      <div className="c-poll-options" />
    </div>
  );

};

//exports

module.exports = View;
