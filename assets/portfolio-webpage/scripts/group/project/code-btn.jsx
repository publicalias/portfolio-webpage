"use strict";

//global imports

const { voidLink } = require("utilities");

//code btn

const CodeBtn = (props) => {

  const code = props.code;

  return typeof code === "string" ? (
    <a href={voidLink(code)}>
      <button className="c-wide-btn">View code</button>
    </a>
  ) : (
    <div className="c-btn-set">
      <a className="c-btn-set__link--first" href={voidLink(code.client)}>
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
