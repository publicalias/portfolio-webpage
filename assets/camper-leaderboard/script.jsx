"use strict";

//local imports

const CamperTable = require("./scripts/components/camper-table");

//global imports

const { getJSON } = require("client-utils");
const { select } = require("dom-api");
const { useSetState } = require("react-utils");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

const { useEffect } = React;

//app logic

const App = () => {

  //state

  const [state, setState] = useSetState({
    sort: "recent",
    recent: null,
    total: null
  });

  //events

  const handleRecent = () => {
    setState({ sort: "recent" });
  };

  const handleTotal = () => {
    setState({ sort: "total" });
  };

  //lifecycle

  useEffect(async () => {

    const [recent, total] = await Promise.all([
      getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/recent"),
      getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
    ]);

    setState({
      recent,
      total
    });

  }, []);

  //render

  const data = state[state.sort];

  return (
    <div className="c-content--md">
      <h1 className="u-align-center">new Leaderboard <a href="https://www.freecodecamp.org/"><i className="fa fa-free-code-camp" /></a></h1>
      <hr />
      <div className="c-campers">
        {data ? (
          <CamperTable
            data={data}
            handleRecent={handleRecent}
            handleTotal={handleTotal}
          />
        ) : <p className="c-campers__loading">Requesting data...</p>}
      </div>
    </div>
  );

};

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
