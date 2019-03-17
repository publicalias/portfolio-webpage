"use strict";

//local imports

const EventLog = require("./scripts/components/event-log");
const Level = require("./scripts/components/level");
const Sidebar = require("./scripts/components/sidebar/sidebar");

const { getHandlers, useKeyDown } = require("./scripts/event-handlers");
const { defaultProps } = require("./scripts/default-props/default-props");
const { newGame } = require("./scripts/new-game/new-game");
const { childProps } = require("./scripts/view-logic");

//global imports

const { checkInput, storageKey } = require("client-utils");
const { select } = require("dom-api");
const { useInterval, useSetState } = require("react-utils");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

const { useEffect, useLayoutEffect } = React;

//app logic

const App = (props) => {

  //state

  const [state, setState] = useSetState(() => {

    const keys = ["deaths", "ng-plus", "best-time"];

    for (const e of keys) {
      storageKey(e, storageKey(e) || 0);
    }

    return storageKey("save") || newGame(props);

  });

  //utilities

  const updateTimer = () => {
    if (document.visibilityState === "visible") {
      setState((state) => {
        if (state.start && state.char.stats.hp && !state.win) {
          return { time: state.time + 1 };
        }
      });
    }
  };

  //events

  const handlers = getHandlers(setState);

  //lifecycle

  useEffect(checkInput, []);

  useLayoutEffect(() => {
    select(window).on("load resize", handlers.resize);
  }, []);

  useEffect(() => {
    storageKey("save", state);
  });

  useInterval(updateTimer, 1000);

  useKeyDown(handlers);

  //render

  const child = childProps(state, props, handlers);

  return (
    <div className="c-content--lg">
      <div className="c-row">
        <div className="c-row__col--12">
          <h1 className="u-align-center">Roguelike</h1>
          <hr />
        </div>
        <div className="c-row__col--8">
          <Level
            bool={child.bool}
            canvas={state.canvas}
            enemies={state.enemies[child.thisLevel]}
            hover={child.hover}
            level={child.level}
            thisLevel={child.thisLevel}
          />
        </div>
        <div className="c-row__col--4">
          <Sidebar charInfo={child.charInfo} hoverBox={child.hoverBox} />
        </div>
        <div className="c-row__col--12">
          <EventLog text={state.eventLog} />
        </div>
      </div>
    </div>
  );

};

App.defaultProps = defaultProps;

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
