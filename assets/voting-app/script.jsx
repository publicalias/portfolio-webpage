"use strict";

//local imports

const UI = require("./scripts/components/ui");

const { actions } = require("./scripts/state/actions/actions");
const { reducer } = require("./scripts/state/reducer/reducer");

//global imports

const ReduxApp = require("components/redux-app");

const { select } = require("dom-api");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

//initialize app

ReactDOM.render((
  <ReduxApp
    UI={UI}
    actions={actions}
    reducer={reducer}
  />
), select(".js-render-react").first);
