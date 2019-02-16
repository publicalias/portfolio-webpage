"use strict";

//local imports

const { cancelSubmit, populateModal } = require("../app-logic");

//global imports

const { toggleModal } = require("modal");
const { bindReactClass } = require("react-utils");
const { deepCopy } = require("utilities");

//node modules

const React = require("react");

//recipe editor

class RecipeEditor extends React.Component {

  constructor(props) {

    super(props);

    this.state = populateModal(this.props);

    bindReactClass(this);

  }

  //handle events

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClose() {
    toggleModal();
  }

  handleSubmit() {

    const state = deepCopy(this.state);

    for (const p in state) {
      if (p !== "num") {
        state[p] = state[p].split("\n")
          .map((e) => e.trim())
          .filter((e) => e)
          .join("\n");
      }
    }

    if (cancelSubmit(this.props, state)) {
      return;
    }

    this.handleClose();

    this.props.updateList(state, this.props.entry ? "edit" : "add");

  }

  render() {
    return (
      <div className="c-modal-show">
        <div className="c-modal-show__shadow js-fade-modal" />
        <div className="c-modal-show__window js-show-modal" >
          <div className="c-content--sm u-inset-modal">
            <h3>{this.props.entry ? "Change Recipe" : "Add Recipe"}</h3>
            <hr />
            <input
              className="u-margin-full"
              maxLength="100"
              name="name"
              onChange={this.handleChange}
              placeholder="Recipe"
              value={this.state.name}
            />
            <textarea
              className="c-field--xs u-margin-full"
              maxLength="3000"
              name="com"
              onChange={this.handleChange}
              placeholder="Comments"
              value={this.state.com}
            />
            <textarea
              className="c-field--sm u-margin-full"
              maxLength="3000"
              name="ingr"
              onChange={this.handleChange}
              placeholder="Ingedients"
              value={this.state.ingr}
            />
            <textarea
              className="c-field--sm"
              maxLength="3000"
              name="inst"
              onChange={this.handleChange}
              placeholder="Instructions"
              value={this.state.inst}
            />
            <hr />
            <button className="c-modal-btn" onClick={this.handleClose}>Close</button>
            <button className="c-modal-btn" onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }

}

//exports

module.exports = RecipeEditor;
