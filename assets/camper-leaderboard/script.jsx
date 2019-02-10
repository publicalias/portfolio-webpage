"use strict";

//local imports

const CamperTable = require("./scripts/components/camper-table");

//global imports

const { select } = require("dom-api");
const { bindReactClass } = require("react-utils");
const { getJSON } = require("utilities");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

//app logic

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      sort: "recent",
      recent: null,
      total: null
    };

    bindReactClass(this);

  }

  //toggle sort

  handleRecent() {
    this.setState({ sort: "recent" });
  }

  handleTotal() {
    this.setState({ sort: "total" });
  }

  //lifecycle

  async componentDidMount() {

    const [recent, total] = await Promise.all([
      getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/recent"),
      getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
    ]);

    this.setState({
      recent,
      total
    });

  }

  render() {

    const data = this.state[this.state.sort];

    return (
      <div className="c-content--md">
        <h1 className="u-align-center">new Leaderboard <a href="https://www.freecodecamp.org/"><i className="fa fa-free-code-camp" /></a></h1>
        <hr />
        <div className="c-campers">
          {data ? (
            <CamperTable
              data={data}
              handleRecent={this.handleRecent}
              handleTotal={this.handleTotal}
            />
          ) : <p className="c-campers__loading">Requesting data...</p>}
        </div>
      </div>
    );

  }

}

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
