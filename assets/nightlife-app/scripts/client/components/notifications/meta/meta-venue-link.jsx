"use strict";

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//meta venue link

const MetaVenueLink = (props) => {

  const { local: { venue } } = props;

  const { jsx: { Link } } = MetaVenueLink.injected;

  //render

  return (
    <Link to={`/venues/page/${venue.id}`}>
      <span className="u-underline">
        {venue.name || "Undefined"}
      </span>
    </Link>
  );

};

MetaVenueLink.propList = ["local"];

MetaVenueLink.injected = { jsx: { Link } };

//exports

module.exports = MetaVenueLink;
