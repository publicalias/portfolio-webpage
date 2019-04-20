"use strict";

//node modules

const React = require("react");

const { connect, Provider } = require("react-redux");
const { BrowserRouter, withRouter } = require("react-router-dom");
const { applyMiddleware, createStore } = require("redux");
const { default: ReduxThunk } = require("redux-thunk");

//redux app

const ReduxApp = (props) => {

  const { actions, reducer, component } = props;

  const middleware = applyMiddleware(ReduxThunk);
  const store = createStore(reducer, middleware);

  const mapState = (state) => ({ data: state });

  const mapDispatch = (dispatch) => ({
    actions: Object.entries(actions).reduce((acc, [key, val]) => {

      acc[key] = (...args) => dispatch(val(...args));

      return acc;

    }, {})
  });

  const Connect = withRouter(connect(mapState, mapDispatch)(component));

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Connect />
      </Provider>
    </BrowserRouter>
  );

};

//exports

module.exports = ReduxApp;
