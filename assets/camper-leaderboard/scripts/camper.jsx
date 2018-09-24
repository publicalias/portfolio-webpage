"use strict";

//camper

const Camper = (props) => (
  <tr className="c-campers__row">
    <td className="c-campers__col--2">{props.rank}</td>
    <td className="c-campers__col--2">
      <a href={`https://github.com/${props.name}`}>
        <img
          alt="Avatar"
          className="c-campers__avatar"
          src={props.avatar}
        />
      </a>
    </td>
    <td className="c-campers__col--2">{props.name}</td>
    <td className="c-campers__col--2">{props.recent}</td>
    <td className="c-campers__col--2 u-align-right">{props.total}</td>
  </tr>
);

//exports

module.exports = Camper;
