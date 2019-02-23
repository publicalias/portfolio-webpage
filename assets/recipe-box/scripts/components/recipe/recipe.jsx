"use strict";

//local imports

const BtnBox = require("./btn-box");
const List = require("./list");

//global imports

const { togglePanel } = require("components/accordion");
const { select } = require("dom-api");
const { bindReactClass } = require("react-utils");

//node modules

const React = require("react");

//recipe

class Recipe extends React.Component {

  constructor(props) {

    super(props);

    this.state = { confirm: false };

    bindReactClass(this);

  }

  //handle events

  handleClick() {

    const id = this.props.entry.num;

    const boxPadding = select(".js-scroll-recipe-box").css().paddingTop;

    togglePanel(id, parseFloat(boxPadding));

  }

  handleChange() {
    this.props.displayModal(this.props.entry.num);
  }

  handleDelete() {
    if (this.state.confirm) {
      this.props.updateList(this.props.entry, "remove");
    } else {
      this.setState({ confirm: true });
    }
  }

  handleCancel() {
    this.setState({ confirm: false });
  }

  //lifecycle

  render() {

    const entry = this.props.entry;

    return (
      <div className="c-panel">
        <h3
          className={`c-panel__toggle js-toggle-panel-${entry.num}`}
          onClick={this.handleClick}
        >
          {`${entry.num + 1}. ${entry.name}`}
        </h3>
        <hr />
        <div className={`c-panel__expand js-expand-panel js-expand-panel-${entry.num}`}>
          <h4 className="u-margin-full">Comments:</h4>
          <p>{entry.com.trim() || "N/A"}</p>
          <hr />
          <List name="Ingredients:" text={entry.ingr} />
          <hr />
          <List name="Instructions:" text={entry.inst} />
          <hr />
          <BtnBox
            confirm={this.state.confirm}
            handleCancel={this.handleCancel}
            handleChange={this.handleChange}
            handleDelete={this.handleDelete}
          />
          <hr />
        </div>
      </div>
    );

  }

}

//exports

module.exports = Recipe;
