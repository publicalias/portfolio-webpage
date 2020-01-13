"use strict";

//local imports

const MetaPageList = require("../../meta/meta-page-list");
const UserControls = require("./user-controls");
const UserData = require("./user-data");

const { getLocation } = require("../../../../app-logic");
const { newUserData } = require("../../../../../../schemas");

//global imports

const { useRefresh } = require("redux/client-utils");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//user page

const UserPage = (props) => {

  const {
    actions: { userClearState, userGetItem },
    data: { user, loading, log, ready, users: { page: { data } } },
    local: { id }
  } = props;

  const {
    jsx: { MetaPageList, UserControls, UserData },
    lib: { getLocation, useRefresh }
  } = UserPage.injected;

  //utilities

  const userData = data.find((e) => e.id === id) || newUserData();

  const refresh = async () => {
    if (ready) {
      userGetItem(id, await getLocation(user));
    }
  };

  //lifecycle

  useLayoutEffect(userClearState, [id]);

  useLayoutEffect(() => {
    refresh(); //async
  }, [ready, id]);

  useRefresh(refresh, loading, log, ["FRIEND_GET_LIST", "META_GET_USER"]);

  //render

  const auth = user.type === "auth";

  return (
    <div className="c-page-view">
      <UserData local={{ userData }} />
      {auth && (
        <UserControls
          {...props}
          local={{ userData }}
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
  "data.loading",
  "data.log",
  "data.ready",
  "data.users.page.data",
  "local"
];

UserPage.injected = {
  jsx: {
    MetaPageList,
    UserControls,
    UserData
  },
  lib: {
    getLocation,
    useRefresh
  }
};

//exports

module.exports = UserPage;
