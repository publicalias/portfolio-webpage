"use strict";

//local imports

const CookieBanner = require("./cookie-banner");
const ErrorMessage = require("./error-message");

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

  const { UI } = App.injected;

  //lifecycle

  useEffect(checkInput, []);

  useLoading(props);

  //render

  const keyGen = initKeyGen();

  return [
    <ErrorMessage {...props} key={keyGen("error")} />,
    <UI {...props} key={keyGen("ui")} />,
    <CookieBanner key={keyGen("cookie")} />
  ];

};

const getContext = (actions) => {

  const mapState = (state) => ({ data: state });

  const mapDispatch = (dispatch) => ({
    actions: Object.entries(actions).reduce((acc, [key, val]) => {

      acc[key] = (...args) => dispatch(val(...args));

      return acc;

    }, {})
  });

  return withRouter(connect(mapState, mapDispatch)(App));

};

const ReduxApp = (props) => {

  const { UI, actions, reducer } = props;

  //utilities

  const middleware = applyMiddleware(ReduxThunk);
  const store = createStore(reducer, middleware);

  App.injected = { UI };

  //render

  const Connected = getContext(actions);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Connected />
      </Provider>
    </BrowserRouter>
  );

};

//exports

module.exports = ReduxApp;
