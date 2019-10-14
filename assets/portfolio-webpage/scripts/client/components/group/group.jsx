"use strict";

//local imports

const Subgroup = require("./subgroup");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//group

const Group = (props) => {

  const { group: { name, id, subgroups } } = props;

  const keyGen = initKeyGen();

  return (
    <div className={`c-content--xl js-scroll-${id}`}>
      <div className="c-grid">
        <div className="c-grid__item--4">
          <h1>{name}</h1>
        </div>
        <div className="c-grid__item--8">
          {subgroups.map((e, i, arr) => (
            <Subgroup
              groupId={id}
              isLastSubgroup={i === arr.length - 1}
              key={keyGen(e.id)}
              subgroup={e}
            />
          ))}
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = Group;
