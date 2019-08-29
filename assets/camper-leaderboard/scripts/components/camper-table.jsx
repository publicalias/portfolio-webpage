"use strict";

//local imports

const Camper = require("./camper");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//camper table

const CamperTable = (props) => {

  const { handleRecent, handleTotal, data } = props;

  const keyGen = initKeyGen();

  return (
    <table className="c-campers__table">
      <thead className="c-campers__head">
        <tr className="c-campers__row">
          <td className="c-campers__col--2">Rank</td>
          <td className="c-campers__col--2" />
          <td className="c-campers__col--4">Name</td>
          <td className="c-campers__col--2 u-cursor-pointer" onClick={handleRecent}>30 days</td>
          <td className="c-campers__col--2 u-cursor-pointer u-align-right" onClick={handleTotal}>All time</td>
        </tr>
      </thead>
      <tbody className="c-campers__body">
        {data.map((e, i) => (
          <Camper
            avatar={e.img}
            key={keyGen(e.username)}
            name={e.username}
            rank={i}
            recent={e.recent}
            total={e.alltime}
          />
        ))}
      </tbody>
    </table>
  );

};

//exports

module.exports = CamperTable;
