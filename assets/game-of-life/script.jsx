"use strict";

//local imports

const Control = require("./scripts/components/control");
const Culture = require("./scripts/components/culture");

const { createCell, getUtils } = require("./scripts/app-logic");
const { getHandlers } = require("./scripts/event-handlers");
const { childProps } = require("./scripts/view-logic");

//global imports

const { checkInput, submitKeys } = require("client-utils");
const { select } = require("dom-api");
const { array2D } = require("react-projects/app-logic");
const { useInterval, useSetState } = require("react-utils");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

const { useEffect, useLayoutEffect } = React;

//app logic

const App = () => {

  //state

  const [state, setState] = useSetState(() => {

    const culture = array2D(48, 48, createCell());

    const pop = culture.flat().filter((e) => e).length;

    return {

      culture,
      start: true,
      stable: !pop,

      history: [],
      reverse: false,

      speed: 300,
      color: 1,
      rules: "B3/S23",
      scale: 48,

      canvas: null,

      gen: 0,
      pop,

      rulesText: "",
      scaleText: ""

    };

  });

  //utilities

  const utils = getUtils(state, setState);

  //events

  const handlers = getHandlers(state, setState, utils);

  //lifecycle

  useEffect(() => {

    checkInput();

    submitKeys("rules");
    submitKeys("scale");

  }, []);

  useLayoutEffect(() => {
    select(window).on("load resize", handlers.resize);
  }, []);

  useInterval(utils.updateCulture, state.start && state.speed);

  //render

  const child = childProps(state, handlers);

  return (
    <div className="c-content--md">
      <div className="c-row">
        <div className="c-row__col--12">
          <h2 className="u-align-center">Conway's Game of Life</h2>
          <hr />
        </div>
        <div className="c-row__col--4">
          <Control control={child.control} display={child.display} />
        </div>
        <div className="c-row__col--8">
          <Culture
            canvas={state.canvas}
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
