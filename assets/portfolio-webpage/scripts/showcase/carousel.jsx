"use strict";

//local imports

const SwipeBtn = require("./swipe-btn");

//global imports

const { voidLink } = require("dom-utils");

//node modules

const React = require("react");

//carousel

const Carousel = (props) => (
  <div className="c-preview">
    <SwipeBtn handleClick={props.turnCarousel(false, true)} mod="left" />
    <SwipeBtn handleClick={props.turnCarousel(true, true)} mod="right" />
    <a className="c-preview__layer--top" href={voidLink(props.links.page)}>
      <div className="c-preview__clear" />
    </a>
    <img
      alt="Screenshot"
      className="c-preview__layer"
      src={props.links.view || "https://via.placeholder.com/800x450?text=undefined"}
    />
  </div>
);

//exports

module.exports = Carousel;
