"use strict";

//local imports

const Carousel = require("./carousel");

const { itemIsInView } = require("../../view-logic");

//global imports

const { select } = require("dom-api");
const { useInterval, useSetState } = require("react-utils");
const { cycleItems } = require("utilities");

//node modules

const React = require("react");

const { useEffect } = React;

//showcase

const Showcase = (props) => {

  //state

  const [state, setState] = useSetState({
    project: props.showcase.projects[0],
    start: true,
    pause: false
  });

  //events

  const handleInit = () => {

    const { start, pause } = state;

    if (pause) {
      return;
    }

    const navHeight = select(".js-ref-nav-bar").rect().height;
    const inView = itemIsInView(".js-toggle-showcase", navHeight);

    if (inView && !start) {
      setState({ start: true });
    } else if (!inView && start) {
      setState({ start: false });
    }

  };

  const handlePause = (bool = false) => () => {
    setState({ pause: bool });
  };

  const handleTurn = (delta) => () => {

    if (!delta) {
      return;
    }

    const DOMShowcase = select(".js-toggle-showcase");

    const project = cycleItems(props.showcase.projects, state.project, delta);

    DOMShowcase.animate({ opacity: 0 }, () => {
      setState({ project }, () => {
        DOMShowcase.animate({ opacity: 1 });
      });
    });

  };

  //lifecycle

  useEffect(handleInit, []);

  useEffect(() => {

    select(window).on("resize scroll", handleInit);

    return () => {
      select(window).off("resize scroll", handleInit);
    };

  });

  useInterval(handleTurn(1), state.start && !state.pause && 5000);

  //render

  const { project: { name, comments, links } } = state;

  return (
    <div className="c-content--xl js-scroll-showcase">
      <div className="c-row">
        <div className="c-row__col--4">
          <h1>Showcase</h1>
        </div>
        <div
          className="c-row__col--8 js-toggle-showcase"
          onMouseEnter={handlePause(true)}
          onMouseLeave={handlePause()}
        >
          <h3 className="u-align-center">{name}</h3>
          <hr />
          {comments && <p className="u-margin-full">{comments}</p>}
          <Carousel
            handlePause={handlePause}
            handleTurn={handleTurn}
            links={links}
          />
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = Showcase;
