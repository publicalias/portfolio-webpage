"use strict";

//local imports

const NavBar = require("./scripts/client/components/nav-bar");
const UI = require("./scripts/client/components/ui");

const { actions } = require("./scripts/client/state/actions/actions");
const { reducer } = require("./scripts/client/state/reducer/reducer");

//global imports

const { App, ReduxApp } = require("redux/components/redux-app");

const { select } = require("all/dom-api");
const { optimize } = require("all/react-utils");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

//setup

Object.assign(App.injected.jsx, {
  NavBar,
  UI
});

const OReduxApp = optimize(ReduxApp);

const local = {
  actions,
  reducer,
  root: "/nightlife-app"
};

//initialize app

ReactDOM.render(<OReduxApp local={local} />, select(".js-render-react").first);
