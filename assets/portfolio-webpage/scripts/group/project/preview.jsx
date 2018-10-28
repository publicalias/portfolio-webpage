"use strict";

//global imports

const { voidLink } = require("dom-utils");

//node modules

const React = require("react");

//preview

const Preview = (props) => {

  const project = props.project;
  const pageLink = voidLink(project.links.page);

  switch (project.preview) {
    case "window":
      return (
        <div className="c-preview u-margin-half">
          <a className="c-preview__layer--top" href={pageLink}>
            <div className="c-preview__clear" />
          </a>
          <img
            alt="Screenshot"
            className="c-preview__layer"
            src={project.links.view || "https://via.placeholder.com/800x450?text=undefined"}
          />
        </div>
      );
    case "button":
      return (
        <a href={pageLink}>
          <button className="c-wide-btn u-margin-half">View page</button>
        </a>
      );
    default:
      return null;
  }

};

//exports

module.exports = Preview;
