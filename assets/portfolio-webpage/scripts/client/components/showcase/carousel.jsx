"use strict";

//local imports

const SwipeBtn = require("./swipe-btn");

const { safeLink } = require("../../app-logic");

//global imports

const { placeholder } = require("all/utilities");

//node modules

const React = require("react");

//carousel

const Carousel = (props) => {

  const { handlers, links: { page, view } } = props;

  //events

  const {
    events: { handleError, handleLoad, handleTouchEnd, handleTouchStart },
    utilities: { handleTurn }
  } = handlers;

  //render

  return (
    <div
      className="c-preview js-ref-carousel"
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      <SwipeBtn handleClick={handleTurn(-1)} type="left" />
      <SwipeBtn handleClick={handleTurn(1)} type="right" />
      <a {...safeLink(page)}>
        <img
          alt="Screenshot"
          className="js-ref-image"
          onError={handleError}
          onLoad={handleLoad}
          src={view || placeholder(800, 450)}
        />
      </a>
    </div>
  );

};

//exports

module.exports = Carousel;
