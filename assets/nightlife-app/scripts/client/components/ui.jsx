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

//node modules

const React = require("react");

const { Route } = require("react-router-dom");

const { useEffect } = React;

//ui

const UI = (props) => {

  const { actions: { metaGetUser, metaSaveAddress, metaToggleLoaded }, data: { user } } = props;

  const {
    jsx: { FriendList, Route, RSVPList, Sidebar, UserList, UserPage, VenueList, VenuePage },
    lib: { getLocation }
  } = UI.injected;

  //utilities

  const initUserData = async () => {

    const { user } = await metaGetUser();

    if (user.type === "auth" && !user.data.location) {
      await metaSaveAddress(user.data.address, await getLocation(user));
      await metaGetUser();
    }

    metaToggleLoaded();

  };

  //lifecycle

  useEffect(() => {
    initUserData(); //async
  }, []);

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

UI.propList = ["data.user"];

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
  lib: { getLocation }
};

//exports

module.exports = UI;
