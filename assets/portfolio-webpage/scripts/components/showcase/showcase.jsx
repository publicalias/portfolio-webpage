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
    view: props.showcase.projects[0],
    start: true,
    pause: false
  });

  //events

  const handleInit = () => {

    if (state.pause) {
      return;
    }

    const navHeight = select(".js-ref-nav-bar").rect().height;
    const inView = itemIsInView(".js-toggle-showcase", navHeight);

    if (inView && !state.start) {
      setState({ start: true });
    } else if (!inView && state.start) {
      setState({ start: false });
    }

  };

  const handlePause = (bool = false) => () => {
    setState({ pause: bool });
  };

  const handleTurn = (delta) => () => {

    const DOMShowcase = select(".js-toggle-showcase");

    const view = cycleItems(props.showcase.projects, state.view, delta);

    DOMShowcase.animate({ opacity: 0 }, () => {
      setState({ view }, () => {
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

  const speed = state.start && !state.pause && 5000;

  useInterval(handleTurn(1), speed);

  //render

  const project = state.view;

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
          <h3 className="u-align-center">{project.name}</h3>
          <hr />
          {project.comments && <p className="u-margin-full">{project.comments}</p>}
          <Carousel handleTurn={handleTurn} links={project.links} />
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = Showcase;
