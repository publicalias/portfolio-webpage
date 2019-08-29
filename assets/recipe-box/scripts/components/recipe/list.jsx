"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//list

const List = (props) => {

  const { name, text } = props;

  const keyGen = initKeyGen();

  return (
    <div>
      <h4 className="u-margin-full" key={keyGen(name)}>{name}</h4>
      {text.length ? (
        <ol>
          {text.split("\n").map((e) => <li key={keyGen(e)}>{e}</li>)}
        </ol>
      ) : <p key={keyGen("N/A")}>N/A</p>}
    </div>
  );

};

//exports

module.exports = List;
