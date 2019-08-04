"use strict";

//local imports

const NavBar = require("./nav-bar");
const Sidebar = require("./sidebar");
const Form = require("./main/form/form");
const List = require("./main/list/list");
const View = require("./main/view/view");

//node modules

const React = require("react");

const { Route } = require("react-router-dom");

const { useEffect } = React;

//ui

const UI = (props) => {

  const { actions: { metaGetUser } } = props;

  const { jsx: { Form, List, NavBar, Route, Sidebar, View } } = UI.injected;

  //lifecycle

  useEffect(() => {
    metaGetUser(); //async
  }, []);

  //render

  return (
    <div className="c-ui">
      <NavBar {...props} />
      <Sidebar {...props} />
      <Route
        exact
        path="/"
        render={() => <List {...props} />}
      />
      <Route path="/form" render={() => <Form {...props} />} />
      <Route path="/list" render={() => <List {...props} />} />
      <Route path="/view/:id" render={({ match }) => <View {...props} local={{ id: match.params.id }} />} />
    </div>
  );

};

UI.propList = [];

UI.injected = {
  jsx: {
    Form,
    List,
    NavBar,
    Route,
    Sidebar,
    View
  }
};

//exports

module.exports = UI;
