"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//list

const List = (props) => {

  const keyGen = initKeyGen();

  return props.list.length ? (
    <div className="u-margin-full">
      <h5 className="u-margin-full">{props.name}</h5>
      <ul>
        {props.list.map((e) => typeof e === "object" ? (
          <li className="u-underline">
            <a href={e.link} key={keyGen(e.link)}>{e.text}</a>
          </li>
        ) : <li key={keyGen(e)}>{e}</li>)}
      </ul>
    </div>
  ) : null;

};

//exports

module.exports = List;
