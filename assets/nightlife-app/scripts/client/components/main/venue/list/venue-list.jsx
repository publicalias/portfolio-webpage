"use strict";

//local imports

const VenueBody = require("./venue-body");
const VenueMenu = require("./venue-menu");

const { getLocation, getVenueParams } = require("../../../../app-logic");

//global imports

const { useInfiniteScroll } = require("redux/client-utils");

//node modules

const React = require("react");

//venue list

const VenueList = (props) => {

  const { actions: { venueClearState, venueGetList }, data: { user, data }, location } = props;

  const {
    jsx: { VenueBody, VenueMenu },
    lib: { getLocation, useInfiniteScroll }
  } = VenueList.injected;

  //utilities

  const fetch = (length) => venueGetList(getVenueParams(location), length, getLocation(user));

  const { handleScroll } = useInfiniteScroll(
    location.search,
    data.venues,
    "data.venues",
    50,
    venueClearState,
    fetch
  );

  //render

  return (
    <React.Fragment>
      <VenueMenu {...props} />
      <VenueBody {...props} local={{ handleScroll }} />
    </React.Fragment>
  );

};

VenueList.propList = ["data.user", "data.data", "location"];

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
