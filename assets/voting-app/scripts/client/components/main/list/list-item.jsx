"use strict";

//local imports

const PollToggle = require("../poll/poll-toggle");

const { getVotes } = require("../../../view-logic");

//global imports

const { readDate } = require("all/utilities");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//list item

const ListItem = (props) => {

  const { data: { user }, local: { poll } } = props;

  const { jsx: { Link, PollToggle }, lib: { getVotes } } = ListItem.injected;

  //render

  const auth = user.type === "auth";

  const stats = `${getVotes(poll.votes)} \u2014 ${readDate(poll.date)}`;

  return (
    <div className="c-list-item">
      <PollToggle
        {...props}
        local={{
          list: true,
          poll,
          role: "hide",
          util: "u-margin-auto"
        }}
      />
      {auth && (
        <PollToggle
          {...props}
          local={{
            list: true,
            poll,
            role: "flag",
            util: "u-margin-auto"
          }}
        />
      )}
      <div className="u-grid-span-2">
        <Link to={`/view/${poll.id}`}>
          <h5 className="u-margin-half">{poll.title}</h5>
          <p className="u-margin-none">{stats}</p>
        </Link>
      </div>
    </div>
  );

};

ListItem.propList = ["data.user", "local"];

ListItem.injected = {
  jsx: {
    Link,
    PollToggle
  },
  lib: { getVotes }
};

//exports

module.exports = ListItem;
