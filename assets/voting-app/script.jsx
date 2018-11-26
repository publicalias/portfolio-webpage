"use strict";

//local imports

const PollView = require("./scripts/poll-view");

//global imports

const { checkInput } = require("check-input");
const { select } = require("dom-api");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

//app

class App extends React.Component {

  handleResize() {

    const height = select(".js-resize-poll").rect().height;

    select(".js-resize-sidebar").rect({ height });

  }

  componentDidMount() {
    checkInput();
    select(window).on("load resize", this.handleResize);
  }

  render() {
    return (
      <div className="c-content--clear">
        <div className="c-row">
          <div className="c-row__col--12">
            <div className="c-main-menu" />
          </div>
          <div className="c-row__col--3">
            <div className="c-sidebar js-resize-sidebar" />
          </div>
          <div className="c-row__col--9">
            <PollView />
          </div>
        </div>
      </div>
    );
  }

}

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
