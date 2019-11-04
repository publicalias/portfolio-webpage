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
          <a {...pageLink}>
            <img
              alt="Screenshot"
              src={view || "https://via.placeholder.com/800x450?text=undefined"}
            />
          </a>
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
