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

const { initPanel } = require("accordion");
const { checkInput } = require("check-input");
const { select } = require("dom-api");
const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

//app logic

class App extends React.Component {

  componentDidMount() {
    initPanel();
    checkInput();
  }

  render() {

    const keyGen = initKeyGen();

    return [
      <NavBar key={keyGen("nav-bar")} navBar={this.props.navBar} />,
      <Bio bio={this.props.bio} key={keyGen("bio")} />,
      <Showcase key={keyGen("showcase")} showcase={this.props.showcase} />,
      this.props.groups.map((e) => <Group group={e} key={keyGen(e.id)} />),
      <Contact contact={this.props.contact} key={keyGen("contact")} />,
      <Footer footer={this.props.footer} key={keyGen("footer")} />,
      <CookieBanner key={keyGen("cookie-banner")} />
    ];

  }

}

App.defaultProps = defaultProps;

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
