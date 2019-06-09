"use strict";

//local imports

const { getListParams } = require("../../../app-logic");
const { getVotes } = require("../../../view-logic");

//global imports

const { readDate } = require("utilities");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//list item

const ListItem = (props) => {

  const { actions: { metaGetPolls, metaGetUser, pollToggleFlag, pollToggleHide }, data: { user, polls } } = props;

  const { poll: { title, id, date, users } } = props;

  //utilities

  const toggle = (prop, a, b) => `fa ${users[prop].includes(user.id) ? a : b}`;

  //events

  const handleHide = async () => {

    const params = getListParams(location);

    await pollToggleHide(id);

    metaGetUser();
    metaGetPolls(params, null, polls.length);

  };

  const handleFlag = async () => {

    const params = getListParams(location);

    await pollToggleFlag(id);

    metaGetPolls(params, null, polls.length);

  };

  //render

  const auth = user.type === "auth";

  const hideIcon = toggle("hidden", "fa-eye-slash", "fa-eye");
  const flagIcon = toggle("flagged", "fa-flag", "fa-flag-o");

  const stats = `${getVotes(users.voted)} Votes \u2014 ${readDate(date)}`;

  return (
    <tr>
      <td>
        <button className="qa-toggle-hide" onClick={handleHide}><i className={hideIcon} /></button>
      </td>
      {auth && (
        <td>
          <button className="qa-toggle-flag" onClick={handleFlag}><i className={flagIcon} /></button>
        </td>
      )}
      <td className="u-cursor-pointer">
        <Link to={`/view?id=${id}`}>
          <p>{title}</p>
          <p className="u-no-margin">{stats}</p>
        </Link>
      </td>
    </tr>
  );

};

//exports

module.exports = ListItem;
