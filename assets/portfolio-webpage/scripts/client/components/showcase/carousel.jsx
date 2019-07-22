"use strict";

//local imports

const SwipeBtn = require("./swipe-btn");

const { voidLink } = require("../../app-logic");

//node modules

const React = require("react");

//carousel

const Carousel = (props) => {

  const { handleTurn, links: { page, view } } = props;

  return (
    <div className="c-preview">
      <SwipeBtn handleClick={handleTurn(-1)} mod="left" />
      <SwipeBtn handleClick={handleTurn(1)} mod="right" />
      <a className="c-preview__layer--top" href={voidLink(page)}>
        <div className="c-preview__clear" />
      </a>
      <img
        alt="Screenshot"
        className="c-preview__layer"
        src={view || "https://via.placeholder.com/800x450?text=undefined"}
      />
    </div>
  );

};

//exports

module.exports = Carousel;