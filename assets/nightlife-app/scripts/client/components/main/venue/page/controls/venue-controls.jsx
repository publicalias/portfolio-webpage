"use strict";

//local imports

const VenueFavorite = require("./venue-favorite");
const VenueRSVP = require("./venue-rsvp");

const { getLocation } = require("../../../../../app-logic");

//node modules

const React = require("react");

//venue controls

const VenueControls = (props) => {

  const {
    actions: { venueGetItem },
    data: { user },
    local: { venue }
  } = props;

  const {
    jsx: { VenueFavorite, VenueRSVP },
    lib: { getLocation }
  } = VenueControls.injected;

  //events

  const refresh = async () => venueGetItem(venue.id, await getLocation(user));

  //render

  const local = {
    refresh,
    venue
  };

  return (
    <div className="c-venue-controls">
      <VenueFavorite {...props} local={local} />
      <VenueRSVP {...props} local={local} />
    </div>
  );

};

VenueControls.propList = ["data.user", "local"];

VenueControls.injected = {
  jsx: {
    VenueFavorite,
    VenueRSVP
  },
  lib: { getLocation }
};

//exports

module.exports = VenueControls;
