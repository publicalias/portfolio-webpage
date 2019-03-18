"use strict";

//local imports

const Bio = require("./scripts/components/bio");
const Contact = require("./scripts/components/contact/contact");
const Footer = require("./scripts/components/footer");
const Group = require("./scripts/components/group/group");
const NavBar = require("./scripts/components/nav-bar/nav-bar");
const Showcase = require("./scripts/components/showcase/showcase");

const { defaultProps } = require("./scripts/default-props/default-props");

//global imports

const CookieBanner = require("components/cookie-banner");

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

  useEffect(checkInput, []);

  useLayoutEffect(initPanel, []);

  //render

  const { navBar, bio, showcase, groups, contact, footer } = props;

  const keyGen = initKeyGen();

  return [
    <NavBar key={keyGen("nav-bar")} navBar={navBar} />,
    <Bio bio={bio} key={keyGen("bio")} />,
    <Showcase key={keyGen("showcase")} showcase={showcase} />,
    groups.map((e) => <Group group={e} key={keyGen(e.id)} />),
    <Contact contact={contact} key={keyGen("contact")} />,
    <Footer footer={footer} key={keyGen("footer")} />,
    <CookieBanner key={keyGen("cookie-banner")} />
  ];

};

App.defaultProps = defaultProps;

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
