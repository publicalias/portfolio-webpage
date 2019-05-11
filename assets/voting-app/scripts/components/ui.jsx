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

  const { actions: { metaGetPolls, metaGetUser } } = props;

  //lifecycle

  useEffect(() => {
    metaGetPolls();
    metaGetUser();
  }, []);

  //render

  return (
    <div className="c-ui">
      <NavBar {...props} />
      <Sidebar />
      <Route
        component={List}
        exact
        path="/voting-app"
      />
      <Route component={List} path="/voting-app/list" />
      <Route component={Form} path="/voting-app/form" />
      <Route component={View} path="/voting-app/view" />
    </div>
  );

};

//exports

module.exports = UI;
