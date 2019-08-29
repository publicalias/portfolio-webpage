"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//media icons

const MediaIcons = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className="c-media-icons">
      {props.contact.map((e) => (
        <a
          className="c-media-icons__link"
          href={e.link}
          key={keyGen(e.link)}
        >
          <h1 className="c-media-icons__icon"><i className={e.iconClass} /></h1>
        </a>
      ))}
    </div>
  );

};

//exports

module.exports = MediaIcons;
