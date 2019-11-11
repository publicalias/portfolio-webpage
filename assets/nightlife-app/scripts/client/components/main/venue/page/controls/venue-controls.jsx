"use strict";

//local imports

const VenueFavorite = require("./venue-favorite");
const VenueRSVP = require("./venue-rsvp");

//node modules

const React = require("react");

//venue controls

const VenueControls = (props) => {

  const { jsx: { VenueFavorite, VenueRSVP } } = VenueControls.injected;

  //render

  return (
    <div className="c-venue-controls">
      <VenueFavorite {...props} />
      <VenueRSVP {...props} />
    </div>
  );

};

VenueControls.propList = [];

VenueControls.injected = {
  jsx: {
    VenueFavorite,
    VenueRSVP
  }
};

//exports

module.exports = VenueControls;
