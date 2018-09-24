"use strict";

//local imports

const Bio = require("./scripts/bio");
const Contact = require("./scripts/contact/contact");
const Footer = require("./scripts/footer");
const Group = require("./scripts/group/group");
const NavBar = require("./scripts/nav-bar/nav-bar");
const Showcase = require("./scripts/showcase/showcase");

const { defaultProps } = require("./scripts/default-props/default-props");

//global imports

const { initPanel } = require("accordion");
const { initKeyGen } = require("react-utils");

//app logic

class App extends React.Component {

  componentDidMount() {
    initPanel();
  }

  render() {

    const keyGen = initKeyGen();

    return [
      <NavBar key={keyGen("nav-bar")} navBar={this.props.navBar} />,
      <Bio bio={this.props.bio} key={keyGen("bio")} />,
      <Showcase key={keyGen("featured")} showcase={this.props.showcase} />,
      this.props.groups.map((e) => <Group group={e} key={keyGen(e.id)} />),
      <Contact contact={this.props.contact} key={keyGen("contact")} />,
      <Footer footer={this.props.footer} key={keyGen("footer")} />
    ];

  }

}

App.defaultProps = defaultProps;

//initialize app

ReactDOM.render(<App />, document.querySelector(".js-render-react"));
