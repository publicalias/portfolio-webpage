"use strict";

//local imports

const VenueControls = require("./controls/venue-controls");
const VenueInfo = require("./venue-info");
const VenueList = require("./venue-list");

const { getLocation } = require("../../../../app-logic");
const { newVenue } = require("../../../../../../schemas");

//global imports

const { get } = require("all/utilities");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//venue page

const VenuePage = (props) => {

  const {
    actions: { venueClearState, venueGetItem },
    data: { user, ready, notifications: { friends, rsvps }, venues: { data } },
    local: { id }
  } = props;

  const {
    jsx: { VenueControls, VenueInfo, VenueList },
    lib: { getLocation }
  } = VenuePage.injected;

  //utilities

  const venue = data.find((e) => e.id === id) || newVenue();

  const initVenueData = async () => {
    venueClearState();
    venueGetItem(id, await getLocation(user));
  };

  //lifecycle

  useLayoutEffect(() => {
    if (ready) {
      initVenueData(); //async
    }
  }, [
    JSON.stringify(get(user, "data.location")),
    ready,
    JSON.stringify(friends),
    JSON.stringify(rsvps)
  ]);

  //render

  const auth = user.type === "auth";

  return (
    <div className="c-venue-page">
      <div className="c-venue-page__info">
        <VenueInfo {...props} local={{ venue }} />
      </div>
      {auth && (
        <div className="c-venue-page__controls">
          <VenueControls {...props} local={{ venue }} />
        </div>
      )}
      <div className="c-venue-page__favorites">
        <VenueList
          local={{
            heading: "Favorites",
            list: venue.favorites
          }}
        />
      </div>
      <div className="c-venue-page__rsvps">
        <VenueList
          local={{
            heading: "RSVPs",
            list: venue.rsvps
          }}
        />
      </div>
    </div>
  );

};

VenuePage.propList = [
  "data.user",
  "data.ready",
  "data.notifications.friends",
  "data.notifications.rsvps",
  "data.venues.data",
  "local"
];

VenuePage.injected = {
  jsx: {
    VenueControls,
    VenueInfo,
    VenueList
  },
  lib: { getLocation }
};

//exports

module.exports = VenuePage;
