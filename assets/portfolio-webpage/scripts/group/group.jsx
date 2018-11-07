"use strict";

//local imports

const Subgroup = require("./subgroup");

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//group

const Group = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className={`c-content--xl js-scroll-${props.group.id}`}>
      <div className="c-row">
        <div className="c-row__col--4">
          <h1>{props.group.name}</h1>
        </div>
        <div className="c-row__col--8">
          {props.group.subgroups.map((e, i, arr) => (
            <Subgroup
              groupId={props.group.id}
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
