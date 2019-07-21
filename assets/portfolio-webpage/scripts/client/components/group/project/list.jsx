"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//list

const List = (props) => {

  const { list, name } = props;

  const keyGen = initKeyGen();

  return list.length ? (
    <div className="u-margin-full">
      <h5 className="u-margin-full">{name}</h5>
      <ul>
        {list.map((e) => typeof e === "object" ? (
          <li className="u-underline" key={keyGen(e.link)}>
            <a href={e.link}>{e.text}</a>
          </li>
        ) : <li key={keyGen(e)}>{e}</li>)}
      </ul>
    </div>
  ) : null;

};

//exports

module.exports = List;
