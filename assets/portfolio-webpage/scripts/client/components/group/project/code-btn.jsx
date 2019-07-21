"use strict";

//local imports

const { voidLink } = require("../../../app-logic");

//node modules

const React = require("react");

//code btn

const CodeBtn = (props) => {

  const { code } = props;

  return typeof code === "string" ? (
    <a href={voidLink(code)}>
      <button className="c-wide-btn">View code</button>
    </a>
  ) : (
    <div className="c-btn-set">
      <a className="c-btn-set__link u-margin-right" href={voidLink(code.client)}>
        <button className="c-btn-set__btn">View code (client)</button>
      </a>
      <a className="c-btn-set__link" href={voidLink(code.server)}>
        <button className="c-btn-set__btn">View code (server)</button>
      </a>
    </div>
  );

};

//exports

module.exports = CodeBtn;
