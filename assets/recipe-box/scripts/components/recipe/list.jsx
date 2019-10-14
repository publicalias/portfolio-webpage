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
    <React.Fragment>
      <h4 className="u-margin-full">{name}</h4>
      {text.length ? (
        <ol>
          {text.split("\n").map((e) => <li key={keyGen(e)}>{e}</li>)}
        </ol>
      ) : <p>N/A</p>}
    </React.Fragment>
  );

};

//exports

module.exports = List;
