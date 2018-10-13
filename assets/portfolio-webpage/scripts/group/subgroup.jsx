"use strict";

//local imports

const Project = require("./project/project");

//global imports

const { togglePanel } = require("accordion");
const { bindReactClass, initKeyGen } = require("react-utils");
const { storageKey } = require("utilities");

//node modules

const React = require("react");

//subgroup

class Subgroup extends React.Component {

  constructor(props) {

    super(props);

    this.state = { viewed: this.props.subgroup.id === storageKey("panel", null, true) };

    bindReactClass(this);

  }

  handleClick() {

    const padding = $(".js-ref-nav-bar").outerHeight() + $(window).outerWidth() * 0.03;

    togglePanel(this.props.subgroup.id, padding);

    if (!this.state.viewed) {
      this.setState({ viewed: true });
    }

  }

  render() {

    const keyGen = initKeyGen();

    const subgroup = this.props.subgroup;

    return (
      <div className="c-panel">
        <h3 className={`c-panel__toggle js-toggle-panel-${subgroup.id}`} onClick={this.handleClick}>{subgroup.name}</h3>
        {!this.props.isLastSubgroup && <hr />}
        <div className={`c-panel__expand js-expand-panel js-expand-panel-${subgroup.id}`}>
          {subgroup.projects.map((e, i, arr) => (
            <Project
              isFirstProject={i === 0}
              isLastProject={i === arr.length - 1}
              isLastSubgroup={this.props.isLastSubgroup}
              key={keyGen(e.id)}
              project={e}
              viewed={this.state.viewed}
            />
          ))}
        </div>
      </div>
    );

  }

}

//exports

module.exports = Subgroup;
