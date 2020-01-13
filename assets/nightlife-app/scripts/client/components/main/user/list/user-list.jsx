"use strict";

//local imports

const UserBody = require("./user-body");
const UserMenu = require("./user-menu");

const { getLocation, getUserParams } = require("../../../../app-logic");

//global imports

const { useInfiniteScroll } = require("redux/client-utils");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//venue list

const UserList = (props) => {

  const {
    actions: { userClearState, userGetList },
    data: { user, ready, users: { list: { data } } },
    location
  } = props;

  const {
    jsx: { UserBody, UserMenu },
    lib: { getLocation, useInfiniteScroll }
  } = UserList.injected;

  //utilities

  const fetch = async (length) => userGetList(getUserParams(location), length, await getLocation(user));

  const { handleReload, handleScroll } = useInfiniteScroll(data, "users.list.data", 50, userClearState, fetch);

  //lifecycle

  useLayoutEffect(() => {
    if (ready) {
      handleReload();
    }
  }, [
    JSON.stringify(user),
    ready,
    location.search
  ]);

  //render

  return (
    <React.Fragment>
      <UserMenu {...props} />
      <UserBody {...props} local={{ handleScroll }} />
    </React.Fragment>
  );

};

UserList.propList = ["data.user", "data.ready", "data.users.list.data", "location"];

UserList.injected = {
  jsx: {
    UserBody,
    UserMenu
  },
  lib: {
    getLocation,
    useInfiniteScroll
  }
};

//exports

module.exports = UserList;
