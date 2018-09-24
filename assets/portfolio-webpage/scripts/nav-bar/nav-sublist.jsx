"use strict";

//local imports

const NavItem = require("./nav-item");

const { positionMenu } = require("../app-logic");

//global imports

const { bindReactClass, initKeyGen } = require("react-utils");

//nav sublist

class NavSublist extends React.Component {

  constructor(props) {

    super(props);

    bindReactClass(this);

  }

  handleClick() {
    $(".js-expand-sublist").toggle();
  }

  componentDidMount() {
    $(window).on("scroll resize", positionMenu);
  }

  render() {

    const keyGen = initKeyGen();

    return (
      <div className="c-nav-bar__sublist">
        <li className="c-nav-bar__item--toggle" onClick={this.handleClick}>{this.props.name}</li>
        <ul className="c-nav-bar__expand js-expand-sublist">
          {this.props.sublist.map((e) => e.type === "item" ? (
            <NavItem
              key={keyGen(e.name)}
              link={e.link}
              mod="sublist"
              name={e.name}
            />
          ) : <hr className="c-nav-bar__rule" key={keyGen("rule")} />)}
        </ul>
      </div>
    );

  }

}

//exports

module.exports = NavSublist;
