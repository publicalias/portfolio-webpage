"use strict";

//local imports

const UI = require("./scripts/client/components/ui");

const { actions } = require("./scripts/client/state/actions/actions");
const { reducer } = require("./scripts/client/state/reducer/reducer");

//global imports

const ReduxApp = require("components/redux-app");

const { select } = require("dom-api");
const { optimize } = require("react-utils");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

//initialize app

ReactDOM.render((
  <ReduxApp
    UI={optimize(UI)}
    actions={actions}
    reducer={reducer}
    root="/voting-app"
  />
), select(".js-render-react").first);
