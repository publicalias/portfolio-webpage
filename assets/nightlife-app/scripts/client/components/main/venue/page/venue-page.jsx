"use strict";

//local imports

const VenueControls = require("./controls/venue-controls");
const VenueData = require("./data/venue-data");
const MetaPageList = require("../../meta/meta-page-list");

const { getLocation } = require("../../../../app-logic");
const { newVenue } = require("../../../../../../schemas");

//global imports

const { useRefresh } = require("redux/client-utils");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//venue page

const VenuePage = (props) => {

  const {
    actions: { venueClearState, venueGetItem },
    data: { user, loading, log, ready, venues: { page } },
    local: { id }
  } = props;

  const {
    jsx: { MetaPageList, VenueControls, VenueData },
    lib: { getLocation, useRefresh }
  } = VenuePage.injected;

  //utilities

  const venue = page.data.find((e) => e.id === id) || newVenue();

  const refresh = async () => {
    if (ready) {
      venueGetItem(id, await getLocation(user));
    }
  };

  //lifecycle

  useLayoutEffect(venueClearState, [id]);

  useLayoutEffect(() => {
    refresh(); //async
  }, [ready, id]);

  useRefresh(refresh, loading, log, [
    "FAVORITE_ADD",
    "FAVORITE_REMOVE",
    "FRIEND_GET_LIST",
    "META_GET_USER",
    "RSVP_GET_LIST"
  ]);

  //render

  const auth = user.type === "auth";

  return (
    <div className="c-page-view">
      <VenueData {...props} local={{ venue }} />
      {auth && (
        <VenueControls
          {...props}
          local={{ venue }}
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
  "data.loading",
  "data.log",
  "data.ready",
  "data.venues.page",
  "local"
];

VenuePage.injected = {
  jsx: {
    MetaPageList,
    VenueControls,
    VenueData
  },
  lib: {
    getLocation,
    useRefresh
  }
};

//exports

module.exports = VenuePage;
