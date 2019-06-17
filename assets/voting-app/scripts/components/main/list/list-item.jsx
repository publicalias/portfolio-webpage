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

  const { data: { user }, poll } = props;

  //render

  const auth = user.type === "auth";

  const stats = `${getVotes(poll.users.voted)} Votes \u2014 ${readDate(poll.date)}`;

  return (
    <tr>
      <td>
        <PollToggle
          {...props}
          list
          type="hide"
        />
      </td>
      {auth && (
        <td>
          <PollToggle
            {...props}
            list
            type="flag"
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

//exports

module.exports = ListItem;
