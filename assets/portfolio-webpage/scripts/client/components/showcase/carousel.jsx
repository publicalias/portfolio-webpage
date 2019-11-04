"use strict";

//local imports

const SwipeBtn = require("./swipe-btn");

const { safeLink } = require("../../app-logic");

//node modules

const React = require("react");

//carousel

const Carousel = (props) => {

  const { handlers, links: { page, view } } = props;

  //events

  const { handleTouchEnd, handleTouchStart, handleTurn } = handlers;

  //render

  return (
    <div
      className="c-preview js-ref-carousel"
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      <SwipeBtn handleClick={handleTurn(-1)} mod="left" />
      <SwipeBtn handleClick={handleTurn(1)} mod="right" />
      <a {...safeLink(page)}>
        <img
          alt="Screenshot"
          src={view || "https://via.placeholder.com/800x450?text=undefined"}
        />
      </a>
    </div>
  );

};

//exports

module.exports = Carousel;
