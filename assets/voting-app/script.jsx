"use strict";

//local imports

const App = require("./scripts/components/app");

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
    actions={actions}
    component={App}
    reducer={reducer}
  />
), select(".js-render-react").first);
