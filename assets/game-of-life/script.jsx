"use strict";

//local imports

const Control = require("./scripts/components/control");
const Culture = require("./scripts/components/culture");

const { createCell, getPopulation, getUtils } = require("./scripts/app-logic");
const { getHandlers, useFastInterval } = require("./scripts/event-handlers");
const { childProps } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("all/client-utils");
const { select } = require("all/dom-api");
const { useSetState } = require("all/react-utils");
const { array2D } = require("react/app-logic");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

const { useEffect } = React;

//app logic

const App = () => {

  //state

  const [state, setState] = useSetState(() => {

    const culture = array2D(48, 48, createCell());

    return getPopulation({

      culture,
      start: true,
      stable: false,

      history: [],
      reverse: false,

      speed: 300,
      color: 1,
      rules: "B3/S23",
      scale: 48,

      gen: 0,
      pop: null,

      rulesText: "",
      scaleText: ""

    });

  });

  //utilities

  const utils = getUtils(state, setState);

  //events

  const handlers = getHandlers(state, setState, utils);

  //lifecycle

  useEffect(checkInput, []);

  useFastInterval(utils.updateCulture, state.start && state.speed);

  //render

  const child = childProps(state, handlers);

  return (
    <div className="c-content--md">
      <h2 className="u-align-center">Conway's Game of Life</h2>
      <hr />
      <div className="c-grid">
        <div className="c-grid__item--4">
          <Control control={child.control} display={child.display} />
        </div>
        <div className="c-grid__item--8">
          <Culture
            culture={state.culture}
            modify={handlers.modify}
          />
        </div>
      </div>
    </div>
  );

};

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
