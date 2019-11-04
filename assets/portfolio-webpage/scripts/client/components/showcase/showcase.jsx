"use strict";

//local imports

const Carousel = require("./carousel");

//global imports

const { itemIsInView } = require("all/client-utils");
const { carousel } = require("all/components/carousel");
const { select } = require("all/dom-api");
const { hookEvent, initKeyGen, useInterval, useSetState } = require("all/react-utils");

//node modules

const React = require("react");

const { useEffect, useRef } = React;

//showcase

const Showcase = (props) => {

  //state

  const [state, setState] = useSetState({
    item: props.showcase.projects[0],
    pause: false,
    start: true
  });

  //utilities

  const touchRef = useRef({
    start: null,
    end: null
  });

  const handlers = carousel({

    actions: {

      setItem(item) {

        const DOMShowcase = select(".js-toggle-showcase");

        DOMShowcase.animate({ opacity: 0 }, () => {
          setState({ item }, () => {
            DOMShowcase.animate({ opacity: 1 });
          });
        });

      },

      setPause(pause) {
        setState({ pause });
      },

      setStart(start) {
        setState({ start });
      }

    },

    data: {
      ...state,
      list: props.showcase.projects
    },

    local: {

      getShown() {

        const navHeight = select(".js-ref-nav-bar").rect().height;

        return itemIsInView(".js-toggle-showcase", navHeight);

      },

      touch: touchRef.current

    }

  });

  //events

  const { handleInit, handlePause, handleTurn } = handlers;

  //lifecycle

  useEffect(handleInit, []);

  useEffect(() => hookEvent(select(window), "resize scroll", handleInit));

  useInterval(handleTurn(1), state.start && !state.pause && 5000);

  //render

  const { item: { name, comments, links } } = state;

  const keyGen = initKeyGen();

  return (
    <div className="c-content--xl js-scroll-showcase">
      <div className="c-grid">
        <div className="c-grid__item--4">
          <h1>Showcase</h1>
        </div>
        <div
          className="c-grid__item--8 js-toggle-showcase"
          onMouseEnter={handlePause(true)}
          onMouseLeave={handlePause()}
        >
          <h3 className="u-align-center">{name}</h3>
          <hr />
          {comments && <p className="u-margin-full">{comments}</p>}
          <Carousel
            handlers={handlers}
            key={keyGen(name)} //smooths transition
            links={links}
          />
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = Showcase;
