"use strict";

//local imports

const { safeLink } = require("../../../app-logic");

//node modules

const React = require("react");

//preview

const Preview = (props) => {

  const { project: { preview, links: { page, view } } } = props;

  const pageLink = safeLink(page);

  switch (preview) {
    case "window":
      return (
        <div className="c-preview u-margin-half">
          <a {...pageLink} className="c-preview__layer--top">
            <div className="c-preview__clear" />
          </a>
          <img
            alt="Screenshot"
            className="c-preview__layer"
            src={view || "https://via.placeholder.com/800x450?text=undefined"}
          />
        </div>
      );
    case "button":
      return (
        <a {...pageLink}>
          <button className="c-wide-btn u-margin-half">View page</button>
        </a>
      );
    default:
      return null;
  }

};

//exports

module.exports = Preview;
