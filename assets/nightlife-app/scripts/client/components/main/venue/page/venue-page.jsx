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
    actions: { venueClearState, venueGetItem },
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
    venueGetItem(id, await getLocation(user));
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

  const mapFn = ({ user: { name, id } }) => [name || "Anonymous", id, `/users/page/${id}`];

  return (
    <div className="c-venue-page">
      <div className="c-venue-page__info">
        <VenueData {...props} local={{ venue }} />
      </div>
      {auth && (
        <div className="c-venue-page__controls">
          <VenueControls {...props} local={{ venue }} />
        </div>
      )}
      <div className="c-venue-page__favorites">
        <MetaPageList
          local={{
            heading: "Favorites",
            list: venue.favorites.map(mapFn)
          }}
        />
      </div>
      <div className="c-venue-page__rsvps">
        <MetaPageList
          local={{
            heading: "RSVPs",
            list: venue.rsvps.map(mapFn)
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
