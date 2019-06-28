"use strict";

//local imports

const PollDisplay = require("../poll/poll-display");
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
      <ViewMenu {...props} local={{ poll }} />
      <PollDisplay
        {...props}
        local={{
          poll,
          role: "view"
        }}
      />
      <div className="c-poll-options" />
    </div>
  );

};

//exports

module.exports = View;
