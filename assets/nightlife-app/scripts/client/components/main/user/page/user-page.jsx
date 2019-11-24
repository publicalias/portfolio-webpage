"use strict";

//local imports

const MetaPageList = require("../../meta/meta-page-list");
const UserControls = require("./user-controls");
const UserData = require("./user-data");

const { getLocation } = require("../../../../app-logic");
const { newUserData } = require("../../../../../../schemas");

//global imports

const { get } = require("all/utilities");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//user page

const UserPage = (props) => {

  const {
    actions: { friendGetList, metaGetUser, userClearState, userGetItem },
    data: { user, ready, notifications: { friends }, users: { data } },
    local: { id }
  } = props;

  const {
    jsx: { MetaPageList, UserControls, UserData },
    lib: { getLocation }
  } = UserPage.injected;

  //utilities

  const userData = data.find((e) => e.id === id) || newUserData();

  const initUserData = async () => {
    friendGetList(); //notifications
    metaGetUser(); //user
    userGetItem(id, await getLocation(user)); //page
  };

  //lifecycle

  useLayoutEffect(userClearState, [id]);

  useLayoutEffect(() => {
    if (ready) {
      initUserData();
    }
  }, [
    get(user, "data.avatar"),
    JSON.stringify(get(user, "data.location")),
    ready,
    JSON.stringify(friends),
    id
  ]);

  //render

  const auth = user.type === "auth";

  return (
    <div className="c-page-view">
      <UserData local={{ userData }} />
      {auth && (
        <UserControls
          {...props}
          local={{
            refresh: initUserData,
            userData
          }}
        />
      )}
      <div className="c-page-info">
        <MetaPageList
          local={{
            heading: "Favorites",
            list: userData.data.favorites,
            type: "venue"
          }}
        />
        <MetaPageList
          local={{
            heading: "Friends",
            list: userData.data.friends.map((e) => ({ user: userData.id === e.from.id ? e.to : e.from })),
            type: "user"
          }}
        />
      </div>
    </div>
  );

};

UserPage.propList = [
  "data.user",
  "data.ready",
  "data.notifications.friends",
  "data.users.data",
  "local"
];

UserPage.injected = {
  jsx: {
    MetaPageList,
    UserControls,
    UserData
  },
  lib: { getLocation }
};

//exports

module.exports = UserPage;
