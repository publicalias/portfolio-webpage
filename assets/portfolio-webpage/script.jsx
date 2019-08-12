"use strict";

//local imports

const Bio = require("./scripts/client/components/bio");
const Contact = require("./scripts/client/components/contact/contact");
const Group = require("./scripts/client/components/group/group");
const NavBar = require("./scripts/client/components/nav-bar/nav-bar");
const Showcase = require("./scripts/client/components/showcase/showcase");

const { defaultProps } = require("./scripts/client/default-props/default-props");

//global imports

const CookieBanner = require("components/cookie-banner");
const LegalStuff = require("components/legal-stuff");

const { checkInput } = require("client-utils");
const { initPanel } = require("components/accordion");
const { select } = require("dom-api");
const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

const { useEffect, useLayoutEffect } = React;

//app logic

const App = (props) => {

  //lifecycle

  useLayoutEffect(initPanel, []);

  useEffect(checkInput, []);

  //render

  const { navBar, bio, showcase, groups, contact } = props;

  const keyGen = initKeyGen();

  return (
    <React.Fragment>
      <NavBar navBar={navBar} />
      <Bio bio={bio} />
      <Showcase showcase={showcase} />
      {groups.map((e) => <Group group={e} key={keyGen(e.id)} />)}
      <Contact contact={contact} />
      <LegalStuff />
      <CookieBanner />
    </React.Fragment>
  );

};

App.defaultProps = defaultProps;

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
