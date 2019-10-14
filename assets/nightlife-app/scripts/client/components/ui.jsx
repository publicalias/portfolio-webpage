"use strict";

//local imports

const UserList = require("./main/user/list/list");
const UserPage = require("./main/user/page/page");
const VenueList = require("./main/venue/list/list");
const VenuePage = require("./main/venue/page/page");

const FriendList = require("./notifications/friend/list");
const RSVPList = require("./notifications/rsvp/list");

const Sidebar = require("./sidebar/sidebar");

//node modules

const React = require("react");

const { Route } = require("react-router-dom");

const { useEffect } = React;

//ui

const UI = (props) => {

  const { actions: { metaGetUser } } = props;

  const { jsx: { FriendList, Route, RSVPList, Sidebar, UserList, UserPage, VenueList, VenuePage } } = UI.injected;

  //lifecycle

  useEffect(() => {
    metaGetUser(); //async
  }, []);

  //render

  return (
    <div className="c-ui">
      <Sidebar {...props} />
      <Route
        exact
        path="/"
        render={() => <VenueList {...props} />}
      />
      <Route path="/user/list" render={() => <UserList {...props} />} />
      <Route path="/user/page/:id" render={({ match }) => <UserPage {...props} local={{ id: match.params.id }} />} />
      <Route path="/venue/list" render={() => <VenueList {...props} />} />
      <Route path="/venue/page/:id" render={({ match }) => <VenuePage {...props} local={{ id: match.params.id }} />} />
      <FriendList {...props} />
      <RSVPList {...props} />
    </div>
  );

};

UI.propList = [];

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
  }
};

//exports

module.exports = UI;
