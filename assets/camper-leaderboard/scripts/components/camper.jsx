"use strict";

//node modules

const React = require("react");

//camper

const Camper = (props) => {

  const { avatar, name, rank, recent, total } = props;

  return (
    <tr className="c-campers__row">
      <td className="c-campers__col--2">{rank}</td>
      <td className="c-campers__col--2">
        <a href={`https://github.com/${name}`}>
          <img
            alt="Avatar"
            className="c-campers__avatar"
            src={avatar}
          />
        </a>
      </td>
      <td className="c-campers__col--2">{name}</td>
      <td className="c-campers__col--2">{recent}</td>
      <td className="c-campers__col--2 u-align-right">{total}</td>
    </tr>
  );

};

//exports

module.exports = Camper;
