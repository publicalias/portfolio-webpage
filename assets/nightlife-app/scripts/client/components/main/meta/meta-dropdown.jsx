"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//meta dropdown

const MetaDropdown = (props) => {

  const { local: { bool, handleSelect, handleToggle, list, name } } = props;

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-dropdown">
      <button className="c-dropdown__toggle qa-toggle-list" onClick={handleToggle}>{name}</button>
      {!bool || !list.length ? null : (
        <div className="c-dropdown__wrapper">
          <div className="c-dropdown__list">
            {list.map((e) => {

              const [text, key, val] = e;

              return (
                <button
                  className={`c-dropdown__item qa-${key}-${val}`}
                  key={keyGen(text)}
                  onClick={handleSelect(key, val)}
                >
                  {text}
                </button>
              );

            })}
          </div>
        </div>
      )}
    </div>
  );

};

MetaDropdown.propList = ["local"];

//exports

module.exports = MetaDropdown;
