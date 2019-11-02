"use strict";

//local imports

const VenueBody = require("./venue-body");
const VenueMenu = require("./venue-menu");

const { getLocation, getVenueParams } = require("../../../../app-logic");

//global imports

const { get } = require("all/utilities");
const { useInfiniteScroll } = require("redux/client-utils");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//venue list

const VenueList = (props) => {

  const {
    actions: { venueClearState, venueGetList },
    data: { user, account, venues: { data } },
    location
  } = props;

  const {
    jsx: { VenueBody, VenueMenu },
    lib: { getLocation, useInfiniteScroll }
  } = VenueList.injected;

  //utilities

  const fetch = async (length) => venueGetList(getVenueParams(location), length, await getLocation(user));

  const { handleReload, handleScroll } = useInfiniteScroll(data, "venues.data", 50, venueClearState, fetch);

  //lifecycle

  useLayoutEffect(() => {
    if (account.loaded) {
      handleReload(); //async
    }
  }, [
    JSON.stringify(get(user, "data.location")),
    account.loaded,
    location.search
  ]);

  //render

  return (
    <React.Fragment>
      <VenueMenu {...props} />
      <VenueBody {...props} local={{ handleScroll }} />
    </React.Fragment>
  );

};

VenueList.propList = ["data.user", "data.account", "data.venues.data", "location"];

VenueList.injected = {
  jsx: {
    VenueBody,
    VenueMenu
  },
  lib: {
    getLocation,
    useInfiniteScroll
  }
};

//exports

module.exports = VenueList;
