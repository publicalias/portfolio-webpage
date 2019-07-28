"use strict";

//local imports

const PollToggle = require("../poll/poll-toggle");

const { getVotes } = require("../../../view-logic");

//global imports

const { readDate } = require("utilities");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//list item

const ListItem = (props) => {

  const { data: { user }, local: { poll } } = props;

  const { jsx: { Link, PollToggle }, lib: { getVotes } } = ListItem.injected;

  //render

  const auth = user.type === "auth";

  const stats = `${getVotes(poll.users.voted)} \u2014 ${readDate(poll.date)}`;

  return (
    <tr>
      <td>
        <PollToggle
          {...props}
          local={{
            list: true,
            poll,
            role: "hide"
          }}
        />
      </td>
      {auth && (
        <td>
          <PollToggle
            {...props}
            local={{
              list: true,
              poll,
              role: "flag"
            }}
          />
        </td>
      )}
      <td className="u-cursor-pointer">
        <Link to={`/view?id=${poll.id}`}>
          <p>{poll.title}</p>
          <p className="u-no-margin">{stats}</p>
        </Link>
      </td>
    </tr>
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
