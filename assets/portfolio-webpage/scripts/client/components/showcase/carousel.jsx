"use strict";

//local imports

const SwipeBtn = require("./swipe-btn");

const { voidLink } = require("../../app-logic");

//global imports

const { swipeEvent } = require("client-utils");
const { select } = require("dom-api");

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
