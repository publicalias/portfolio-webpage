"use strict";

//local imports

const EventLog = require("./scripts/components/event-log");
const Sidebar = require("./scripts/components/sidebar/sidebar");
const ViewPort = require("./scripts/components/view-port");

const { getHandlers, useKeyDown } = require("./scripts/event-handlers");
const { defaultProps } = require("./scripts/default-props/default-props");
const { newGame } = require("./scripts/new-game/new-game");
const { childProps } = require("./scripts/view-logic");

//global imports

const { checkInput, storageKey } = require("client-utils");
const { select } = require("dom-api");
const { useSetState } = require("react-utils");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

const { useEffect } = React;

//app logic

const App = (props) => {

  //state

  const [state, setState] = useSetState(() => {

    const keys = ["deaths", "ng-plus", "best-time"];

    for (const e of keys) {
      storageKey(e, (val) => val || 0);
    }

    return storageKey("save") || newGame(props);

  });

  //events

  const handlers = getHandlers(state, setState, props);

  //lifecycle

  useEffect(checkInput, []);

  useEffect(() => {
    storageKey("save", state);
  });

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
          <ViewPort {...child.viewPort} />
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
