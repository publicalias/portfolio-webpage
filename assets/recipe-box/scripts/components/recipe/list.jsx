"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//list

const List = (props) => {

  const keyGen = initKeyGen();

  return (
    <div>
      <h4 className="u-margin-full" key={keyGen(props.name)}>{props.name}</h4>
      {props.text.length ? (
        <ol>
          {props.text.split("\n").map((e) => <li key={keyGen(e)}>{e}</li>)}
        </ol>
      ) : <p key={keyGen("N/A")}>N/A</p>}
    </div>
  );

};

//exports

module.exports = List;
