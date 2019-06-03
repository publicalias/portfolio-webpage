"use strict";

//local imports

const NavBar = require("./nav-bar");
const Sidebar = require("./sidebar");
const Form = require("./poll/form/form");
const List = require("./poll/list/list");
const View = require("./poll/view/view");

//node modules

const React = require("react");

const { Route } = require("react-router-dom");

const { useEffect } = React;

//ui

const UI = (props) => {

  const { actions: { metaGetUser } } = props;

  //lifecycle

  useEffect(() => {
    metaGetUser(); //returns promise
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
      <Route path="/list" render={() => <List {...props} />} />
      <Route path="/form" render={() => <Form {...props} />} />
      <Route component={View} path="/view" />
    </div>
  );

};

//exports

module.exports = UI;
