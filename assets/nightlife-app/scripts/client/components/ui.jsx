"use strict";

//local imports

const UserList = require("./main/user/list/user-list");
const UserPage = require("./main/user/page/user-page");
const VenueList = require("./main/venue/list/venue-list");
const VenuePage = require("./main/venue/page/venue-page");

const FriendList = require("./notifications/friend/friend-list");
const RSVPList = require("./notifications/rsvp/rsvp-list");

const Sidebar = require("./sidebar/sidebar");

const { getLocation } = require("../app-logic");

//global imports

const { useRefresh } = require("redux/client-utils");

//node modules

const React = require("react");

const { Route } = require("react-router-dom");

const { useEffect } = React;

//ui

const UI = (props) => {

  const {
    actions: { metaGetUser, metaSaveAddress, metaSetReady },
    data: { user, loading, log }
  } = props;

  const {
    jsx: { FriendList, Route, RSVPList, Sidebar, UserList, UserPage, VenueList, VenuePage },
    lib: { getLocation, useRefresh }
  } = UI.injected;

  //utilities

  const initUser = async () => {

    const { user } = await metaGetUser();

    if (user.type === "auth" && !user.data.location) {
      await metaSaveAddress(user.data.address, await getLocation(user));
    }

    metaSetReady(true);

  };

  //lifecycle

  useEffect(() => {
    initUser(); //async
  }, []);

  useRefresh(metaGetUser, loading, log, [
    "META_SAVE_ADDRESS",
    "META_SAVE_AVATAR",
    "USER_TOGGLE_BLOCK"
  ]);

  //render

  const auth = user.type === "auth";

  return (
    <div className="c-ui">
      <Sidebar {...props} />
      <Route
        exact
        path="/"
        render={() => <VenueList {...props} />}
      />
      <Route path="/users/list" render={() => <UserList {...props} />} />
      <Route
        path="/users/page/:id"
        render={({ match }) => <UserPage {...props} local={{ id: match.params.id }} />}
      />
      <Route path="/venues/list" render={() => <VenueList {...props} />} />
      <Route
        path="/venues/page/:id"
        render={({ match }) => <VenuePage {...props} local={{ id: match.params.id }} />}
      />
      {auth && <RSVPList {...props} />}
      {auth && <FriendList {...props} />}
    </div>
  );

};

UI.propList = ["data.user", "data.loading", "data.log"];

UI.injected = {
  jsx: {
    FriendList,
    Route,
    RSVPList,
    Sidebar,
    UserList,
    UserPage,
    VenueList,
    VenuePage
  },
  lib: {
    getLocation,
    useRefresh
  }
};

//exports

module.exports = UI;
