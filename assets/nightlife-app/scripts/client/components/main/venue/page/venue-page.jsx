"use strict";

//local imports

const VenueControls = require("./venue-controls");
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
    data: { user, account, notifications: { friends, rsvps }, venues: { data } },
    local: { id }
  } = props;

  const { lib: { getLocation } } = VenuePage.injected;

  //utilities

  const venue = data.find((e) => e.id === id) || newVenue();

  const initVenueData = async () => {
    venueClearState();
    venueGetItem(id, await getLocation(user));
  };

  //lifecycle

  useLayoutEffect(() => {
    if (account.loaded) {
      initVenueData(); //async
    }
  }, [
    JSON.stringify(get(user, "data.location")),
    account.loaded,
    JSON.stringify(friends),
    JSON.stringify(rsvps)
  ]);

  //render

  return (
    <div className="c-venue-page">
      <VenueInfo {...props} local={{ venue }} />
      <VenueControls {...props} local={{ venue }} />
      <VenueList
        local={{
          heading: "Favorites",
          list: venue.favorites
        }}
      />
      <VenueList
        local={{
          heading: "RSVPs",
          list: venue.rsvps
        }}
      />
    </div>
  );

};

VenuePage.propList = [
  "data.user",
  "data.account",
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
