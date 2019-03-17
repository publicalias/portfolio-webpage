"use strict";

/*global marked*/

//global imports

const { select } = require("dom-api");
const { useSetState } = require("react-utils");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

const { useEffect } = React;

//utilities

marked.setOptions({ breaks: true });

//app logic

const App = () => {

  //state

  const [state, setState] = useSetState({ text: "# Lorem ipsum\n### Dolor sit amet,\n> consectetur adipiscing elit.\n\nOrdered list:\n1. *italic*\n2. **bold**\n\nUnordered list:\n* `monospace`\n* ~~strikethrough~~\n\n[Ethan Frost](https://github.com/publicalias)" });

  //events

  const handleChange = (event) => {
    setState({ text: event.target.value });
  };

  //lifecycle

  useEffect(() => {
    select(".js-render-preview").html(marked(state.text));
  });

  //render

  return (
    <div className="c-content--xl">
      <div className="c-row">
        <div className="c-row__col--12">
          <h1 className="u-align-center">Markdown &agrave; la <a href="https://github.com/"><i className="fa fa-github" /></a></h1>
          <hr />
        </div>
        <div className="c-row__col--6">
          <textarea
            className="c-md-preview"
            maxLength="3000"
            onChange={handleChange}
            value={state.text}
          />
        </div>
        <div className="c-row__col--6">
          <div className="c-md-preview js-render-preview u-emulate-md" />
        </div>
      </div>
    </div>
  );

};

//initialize app

ReactDOM.render(<App />, select(".js-render-react").first);
