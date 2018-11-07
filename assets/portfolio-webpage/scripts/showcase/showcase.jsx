"use strict";

//local imports

const Carousel = require("./carousel");

const { getNextView, itemIsInView } = require("../app-logic");

//global imports

const { select } = require("dom-api");
const { bindReactClass } = require("react-utils");

//node modules

const React = require("react");

//showcase

class Showcase extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      view: 0,
      next: null,
      paused: false
    };

    bindReactClass(this);

  }

  //carousel events

  initCarousel() {

    if (this.state.paused) {
      return;
    }

    const navHeight = select(".js-ref-nav-bar").rect().height;
    const inView = itemIsInView(".js-toggle-showcase", navHeight);

    if (inView && !this.state.next) {
      this.spinCarousel();
    } else if (!inView && this.state.next) {
      this.spinCarousel(true);
    }

  }

  turnCarousel(right, reset) {
    return () => {

      const DOMShowcase = select(".js-toggle-showcase");

      const view = getNextView(right, this.props.showcase, this.state.view);

      DOMShowcase.animate({ opacity: 0 }, () => {
        this.setState({ view }, () => {
          DOMShowcase.animate({ opacity: 1 });
        });
      });

      if (reset) {
        this.spinCarousel();
      }

    };
  }

  spinCarousel(clear) {

    clearInterval(this.state.next);

    this.setState({ next: clear ? null : setInterval(this.turnCarousel(true), 5000) });

  }

  togglePaused(bool = false) {
    return () => {
      this.spinCarousel(bool);
      this.setState({ paused: bool });
    };
  }

  //lifecycle

  componentDidMount() {

    this.initCarousel();

    select(window).on("scroll", this.initCarousel);

  }

  render() {

    const project = this.props.showcase.projects[this.state.view];

    return (
      <div className="c-content--xl js-scroll-showcase">
        <div className="c-row">
          <div className="c-row__col--4">
            <h1>Showcase</h1>
          </div>
          <div
            className="c-row__col--8 js-toggle-showcase"
            onMouseEnter={this.togglePaused(true)}
            onMouseLeave={this.togglePaused()}
          >
            <h3 className="u-align-center">{project.name}</h3>
            <hr />
            {project.comments && <p className="u-margin-full">{project.comments}</p>}
            <Carousel links={project.links} turnCarousel={this.turnCarousel} />
          </div>
        </div>
      </div>
    );

  }

}

//exports

module.exports = Showcase;
