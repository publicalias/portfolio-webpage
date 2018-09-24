"use strict";

/*global marked*/

//global imports

const { bindReactClass } = require("react-utils");

//utilities

marked.setOptions({ breaks: true });

//app logic

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = { text: "# Lorem ipsum\n### Dolor sit amet,\n> consectetur adipiscing elit.\n\nOrdered list:\n1. *italic*\n2. **bold**\n\nUnordered list:\n* `monospace`\n* ~~strikethrough~~\n\n[Ethan Frost](https://github.com/publicalias)" };

    bindReactClass(this);

  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
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
              onChange={this.handleChange}
              value={this.state.text}
            />
          </div>
          <div className="c-row__col--6">
            <div className="c-md-preview u-emulate-md" dangerouslySetInnerHTML={{ __html: marked(this.state.text) }} />
          </div>
        </div>
      </div>
    );
  }

}

//initialize app

ReactDOM.render(<App />, document.querySelector(".js-render-react"));
