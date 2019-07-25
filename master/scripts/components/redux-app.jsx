"use strict";

//local imports

const CookieBanner = require("./cookie-banner");
const ErrorMessage = require("./error-message");
const LegalStuff = require("./legal-stuff");

const { checkInput } = require("../client-utils");
const { initKeyGen } = require("../react-utils");
const { useLoading } = require("../redux-utils/client-utils");

//node modules

const React = require("react");

const { connect, Provider } = require("react-redux");
const { BrowserRouter, withRouter } = require("react-router-dom");
const { applyMiddleware, createStore } = require("redux");
const { default: ReduxThunk } = require("redux-thunk");

const { useEffect } = React;

//redux app

const App = (props) => {

  const { jsx: { UI } } = App.injected;

  //lifecycle

  useEffect(checkInput, []);

  useLoading(props);

  //render

  const keyGen = initKeyGen();

  return [
    <ErrorMessage {...props} key={keyGen("error")} />,
    <UI {...props} key={keyGen("ui")} />,
    <LegalStuff key={keyGen("legal")} />,
    <CookieBanner key={keyGen("cookie")} />
  ];

};

App.injected = { jsx: { UI: null } };

const getContext = (actions) => {

  const mapState = (state) => ({ data: state });

  const mapDispatch = (dispatch) => ({
    actions: Object.entries(actions).reduce((acc, [key, val]) => {

      const thunk = typeof val() === "function";

      acc[key] = thunk ? (...args) => dispatch(val(...args)) : (...args) => {
        dispatch(val(...args));
      };

      return acc;

    }, {})
  });

  return withRouter(connect(mapState, mapDispatch)(App));

};

const ReduxApp = (props) => {

  const { UI, actions, reducer, root } = props;

  //utilities

  const middleware = applyMiddleware(ReduxThunk);
  const store = createStore(reducer, middleware);

  App.injected.jsx.UI = UI;

  //render

  const Connected = getContext(actions);

  return (
    <BrowserRouter basename={root}>
      <Provider store={store}>
        <Connected />
      </Provider>
    </BrowserRouter>
  );

};

//exports

module.exports = ReduxApp;
