"use strict";

//local imports

const NavBar = require("./nav-bar");
const Sidebar = require("./sidebar");
const Form = require("./poll/form");
const List = require("./poll/list");
const View = require("./poll/view");

//node modules

const React = require("react");

const { Route } = require("react-router-dom");

const { useEffect } = React;

//ui

const UI = (props) => {

  const { actions: { metaGetUser } } = props;

  //lifecycle

  useEffect(() => {
    metaGetUser();
  }, []);

  //render

  return (
    <div className="c-ui">
      <NavBar {...props} />
      <Sidebar {...props} />
      <Route
        component={List}
        exact
        path="/"
      />
      <Route component={List} path="/list" />
      <Route component={Form} path="/form" />
      <Route component={View} path="/view" />
    </div>
  );

};

//exports

module.exports = UI;
