"use strict";

//global imports

const { bindReactClass } = require("react-utils");

//node modules

const React = require("react");

//controls

class Controls extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      settings: false,
      private: false,
      confirm: false
    };

    bindReactClass(this);

  }

  handleSettings() {
    this.setState((prev) => ({
      settings: !prev.settings,
      confirm: false
    }));
  }

  handlePrivate() {
    this.setState((prev) => ({ private: !prev.private }));
  }

  handleDelete() {
    this.setState((prev) => ({ confirm: !prev.confirm }));
  }

  render() {
    return (
      <div className="c-controls u-margin-full">
        <button className="c-controls__btn">Share</button>
        <div className="c-controls__set">
          <button className="c-controls__set-btn--first">Last</button>
          <button className="c-controls__set-btn">Next</button>
        </div>
        <div className="c-controls__set">
          <input className="c-controls__set-input--first" />
          <button className="c-controls__set-btn">Add</button>
        </div>
        <button className="c-controls__btn" onClick={this.handleSettings}>{this.state.settings ? "Cancel" : "Settings"}</button>
        {this.state.settings && (
          <div>
            <button className="c-controls__btn" onClick={this.handlePrivate}>{this.state.private ? "Public" : "Private"}</button>
            <button className="c-controls__btn" onClick={this.handleDelete}>{this.state.confirm ? "Cancel" : "Delete"}</button>
            {this.state.confirm && <button className="c-controls__btn">Confirm</button>}
          </div>
        )}
      </div>
    );
  }

}

//exports

module.exports = Controls;
