"use strict";

/*eslint react/no-multi-comp: 0*/

//global imports

const CookieBanner = require("all/components/cookie-banner");
const LegalStuff = require("all/components/legal-stuff");
const ErrorMessage = require("redux/components/error-message");

const { checkInput } = require("all/client-utils");
const { select } = require("all/dom-api");

//node modules

const React = require("react");

const { connect, Provider } = require("react-redux");
const { BrowserRouter, withRouter } = require("react-router-dom");
const { applyMiddleware, createStore } = require("redux");
const { default: ReduxThunk } = require("redux-thunk");

const { useEffect } = React;

//redux app

const App = (props) => {

  const { data: { loading }, location } = props;

  const { jsx: { CookieBanner, ErrorMessage, LegalStuff, NavBar, UI } } = App.injected;

  //utilities

  const bool = Boolean(loading);

  //lifecycle

  useEffect(checkInput, []);

  useEffect(() => {
    select(".js-toggle-loading").class("is-loading", true, bool);
  }, [bool]);

  useEffect(() => {
    select(document.scrollingElement).scrollTop = 0;
  }, [location.key]);

  //render

  return (
    <React.Fragment>
      <NavBar {...props} />
      <ErrorMessage {...props} />
      <UI {...props} />
      <LegalStuff />
      <CookieBanner />
    </React.Fragment>
  );

};

App.propList = ["data.loading", "location"];

App.injected = {
  jsx: {
    CookieBanner,
    ErrorMessage,
    LegalStuff,
    NavBar: null,
    UI: null
  }
};

const getContext = (Component, actions) => {

  const { metaSetLoading } = actions;

  const withStore = connect(
    (state) => ({ data: state }),
    (dispatch) => ({
      actions: Object.entries(actions).reduce((acc, [key, val]) => Object.assign(acc, {
        [key]: typeof val() === "object"
          ? (...args) => {
            dispatch(val(...args));
          }
          : async (...args) => {

            const loading = (bool) => dispatch(metaSetLoading(bool));

            loading(true);

            const res = await dispatch(val(...args));

            loading();

            return res;

          }
      }), {})
    })
  );

  return withRouter(withStore(Component));

};

const ReduxApp = (props) => {

  const { local: { actions, reducer, root } } = props;

  const { metaLogAction } = actions;

  const { jsx: { App, BrowserRouter, Provider } } = ReduxApp.injected;

  //utilities

  const logActions = (store) => (next) => (action) => {

    if (action.type !== "META_LOG_ACTION") {
      store.dispatch(metaLogAction(action.type));
    }

    return next(action);

  };

  const middleware = applyMiddleware(logActions, ReduxThunk);
  const store = createStore(reducer, middleware);

  const Connected = getContext(App, actions);

  //render

  return (
    <BrowserRouter basename={root}>
      <Provider store={store}>
        <Connected />
      </Provider>
    </BrowserRouter>
  );

};

ReduxApp.propList = [];

ReduxApp.injected = {
  jsx: {
    App,
    BrowserRouter,
    Provider
  }
};

//exports

module.exports = {
  App,
  ReduxApp
};
