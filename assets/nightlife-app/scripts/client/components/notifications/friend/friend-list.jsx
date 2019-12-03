"use strict";

//local imports

const FriendItem = require("./friend-item");
const MetaList = require("../meta/meta-list");

//global imports

const { initKeyGen } = require("all/react-utils");
const { useRefresh } = require("redux/client-utils");

//node modules

const React = require("react");

//friend list

const FriendList = (props) => {

  const { actions: { friendGetList }, data: { loading, log, notifications: { friends } } } = props;

  const { jsx: { FriendItem, MetaList }, lib: { useRefresh } } = FriendList.injected;

  //lifecycle

  useRefresh(friendGetList, loading, log, [
    "FRIEND_ADD",
    "FRIEND_CONFIRM",
    "FRIEND_DISMISS",
    "FRIEND_REMOVE",
    "META_GET_USER"
  ]);

  //render

  const keyGen = initKeyGen();

  return (
    <MetaList
      {...props}
      local={{
        heading: "Friend Requests",
        refresh: friendGetList,
        type: "friend"
      }}
    >
      {friends.map((e) => (
        <FriendItem
          {...props}
          key={keyGen(e.id)}
          local={{ friend: e }}
        />
      ))}
    </MetaList>
  );

};

FriendList.propList = ["data.loading", "data.log", "data.notifications.friends"];

FriendList.injected = {
  jsx: {
    FriendItem,
    MetaList
  },
  lib: { useRefresh }
};

//exports

module.exports = FriendList;
