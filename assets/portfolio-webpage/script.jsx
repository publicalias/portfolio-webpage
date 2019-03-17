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

  const keyGen = initKeyGen();

  return [
    <NavBar key={keyGen("nav-bar")} navBar={props.navBar} />,
    <Bio bio={props.bio} key={keyGen("bio")} />,
    <Showcase key={keyGen("showcase")} showcase={props.showcase} />,
    props.groups.map((e) => <Group group={e} key={keyGen(e.id)} />),
    <Contact contact={props.contact} key={keyGen("contact")} />,
    <Footer footer={props.footer} key={keyGen("footer")} />,
    <CookieBanner key={keyGen("cookie-banner")} />
  ];

};

App.defaultProps = defaultProps;

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
