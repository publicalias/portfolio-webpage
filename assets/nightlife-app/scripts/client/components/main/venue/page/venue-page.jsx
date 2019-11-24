"use strict";

//local imports

const VenueControls = require("./controls/venue-controls");
const VenueData = require("./data/venue-data");
const MetaPageList = require("../../meta/meta-page-list");

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
    actions: { rsvpGetList, venueClearState, venueGetItem },
    data: { user, ready, notifications: { friends, rsvps }, venues: { data } },
    local: { id }
  } = props;

  const {
    jsx: { MetaPageList, VenueControls, VenueData },
    lib: { getLocation }
  } = VenuePage.injected;

  //utilities

  const venue = data.find((e) => e.id === id) || newVenue();

  const initVenueData = async () => {
    rsvpGetList(); //notifications
    venueGetItem(id, await getLocation(user)); //page
  };

  //lifecycle

  useLayoutEffect(venueClearState, [id]);

  useLayoutEffect(() => {
    if (ready) {
      initVenueData();
    }
  }, [
    JSON.stringify(get(user, "data.location")),
    ready,
    JSON.stringify(friends),
    JSON.stringify(rsvps),
    id
  ]);

  //render

  const auth = user.type === "auth";

  return (
    <div className="c-page-view">
      <VenueData {...props} local={{ venue }} />
      {auth && (
        <VenueControls
          {...props}
          local={{
            refresh: initVenueData,
            venue
          }}
        />
      )}
      <div className="c-page-info">
        <MetaPageList
          local={{
            heading: "Favorites",
            list: venue.favorites,
            type: "user"
          }}
        />
        <MetaPageList
          local={{
            heading: "RSVPs",
            list: venue.rsvps,
            type: "user"
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
    MetaPageList,
    VenueControls,
    VenueData
  },
  lib: { getLocation }
};

//exports

module.exports = VenuePage;
