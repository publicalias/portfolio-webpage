"use strict";

//local imports

const Form = require("./main/form/form");
const List = require("./main/list/list");
const View = require("./main/view/view");

const Sidebar = require("./sidebar");

//global imports

const { useRefresh } = require("redux/client-utils");

//node modules

const React = require("react");

const { Route } = require("react-router-dom");

const { useEffect } = React;

//ui

const UI = (props) => {

  const { actions: { metaGetUser }, data: { loading, log } } = props;

  const { jsx: { Form, List, Route, Sidebar, View }, lib: { useRefresh } } = UI.injected;

  //lifecycle

  useEffect(() => {
    metaGetUser(); //async
  }, []);

  useRefresh(metaGetUser, loading, log, [
    "POLL_CAST_VOTE",
    "POLL_TOGGLE_HIDE"
  ]);

  //render

  return (
    <div className="c-ui">
      <Sidebar {...props} />
      <Route
        exact
        path="/"
        render={() => <List {...props} />}
      />
      <Route path="/form" render={() => <Form {...props} />} />
      <Route path="/list" render={() => <List {...props} />} />
      <Route
        path="/view/:id"
        render={({ match }) => <View {...props} local={{ id: match.params.id }} />}
      />
    </div>
  );

};

UI.propList = ["data.loading", "data.log"];

UI.injected = {
  jsx: {
    Form,
    List,
    Route,
    Sidebar,
    View
  },
  lib: { useRefresh }
};

//exports

module.exports = UI;
