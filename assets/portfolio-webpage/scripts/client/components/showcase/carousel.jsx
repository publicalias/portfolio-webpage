"use strict";

//local imports

const SwipeBtn = require("./swipe-btn");

const { safeLink } = require("../../app-logic");

//global imports

const { swipeEvent } = require("all/client-utils");
const { select } = require("all/dom-api");

//node modules

const React = require("react");

const { useRef } = React;

//carousel

const Carousel = (props) => {

  const { handlePause, handleTurn, links: { page, view } } = props;

  //utilities

  const touchRef = useRef({
    start: null,
    end: null
  });

  //events

  const handleTouchStart = (event) => {

    const { current: touch } = touchRef;

    event.persist();

    touch.start = event;

    handlePause(true)();

  };

  const handleTouchEnd = (event) => {

    const { current: touch } = touchRef;

    const { height, width } = select(".js-ref-preview").rect();

    const swipe = {
      left: 1,
      right: -1
    };

    event.persist();

    touch.end = event;

    const to = swipeEvent(touch.start, touch.end, height, width);

    handleTurn(swipe[to])();

    handlePause()();

  };

  //render

  return (
    <div
      className="c-preview js-ref-preview"
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      <SwipeBtn handleClick={handleTurn(-1)} mod="left" />
      <SwipeBtn handleClick={handleTurn(1)} mod="right" />
      <a {...safeLink(page)} className="c-preview__layer--top">
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
