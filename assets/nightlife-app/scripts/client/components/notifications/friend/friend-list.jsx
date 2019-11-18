"use strict";

//local imports

const FriendItem = require("./friend-item");
const MetaList = require("../meta/meta-list");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//friend list

const FriendList = (props) => {

  const { actions: { friendGetList }, data: { notifications: { friends }, users: { data } } } = props;

  const { jsx: { FriendItem, MetaList } } = FriendList.injected;

  //render

  const keyGen = initKeyGen();

  return (
    <MetaList
      local={{
        bool: JSON.stringify(data),
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

FriendList.propList = ["data.notifications.friends", "data.users.data"];

FriendList.injected = {
  jsx: {
    FriendItem,
    MetaList
  }
};

//exports

module.exports = FriendList;
