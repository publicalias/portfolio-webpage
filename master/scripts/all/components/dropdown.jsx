"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//dropdown

const Dropdown = (props) => {

  const { local: { handleToggle, list, name, open, util = "" } } = props;

  //render

  const keyGen = initKeyGen();

  return (
    <div className={`c-dropdown ${util}`}>
      <button className="c-dropdown__toggle" onClick={handleToggle}>{name}</button>
      {!open || !list.length ? null : (
        <div className="c-dropdown__wrapper">
          <div className="c-dropdown__list">
            {list.map(({ handleClick, text }) => (
              <button
                className="c-dropdown__item"
                key={keyGen(text)}
                onClick={handleClick}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

};

Dropdown.propList = ["local"];

//exports

module.exports = Dropdown;
