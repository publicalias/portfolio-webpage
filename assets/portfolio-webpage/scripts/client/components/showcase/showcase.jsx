"use strict";

//local imports

const Carousel = require("./carousel");

//global imports

const { itemIsInView } = require("all/client-utils");
const { useCarousel } = require("all/components/carousel");
const { select } = require("all/dom-api");
const { initKeyGen, useSetState } = require("all/react-utils");

//node modules

const React = require("react");

//showcase

const Showcase = (props) => {

  //state

  const list = props.showcase.projects;

  const [state, setState] = useSetState({
    item: list[0],
    list,
    pause: false,
    start: false
  });

  //lifecycle

  const handlers = useCarousel({

    actions: {

      setItem(item) {
        setState({ item });
      },

      setPause(pause) {
        setState({ pause });
      },

      setStart(start) {
        setState({ start });
      }

    },

    data: state,

    local: {
      getShown() {

        const navHeight = select(".js-ref-nav-bar").rect().height;

        return itemIsInView(".js-fade-carousel", navHeight);

      }
    }

  });

  const { utilities: { handlePause } } = handlers;

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
          className="c-grid__item--8 js-fade-carousel"
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
