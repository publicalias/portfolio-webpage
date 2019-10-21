"use strict";

//local imports

const Item = require("./item");
const List = require("../meta/list");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//wrap list

const WrapList = (props) => {

  const { actions: { friendGetList }, data: { notifications: { friends } } } = props;

  const { jsx: { Item, List } } = WrapList.injected;

  //render

  const keyGen = initKeyGen();

  const list = friends.map((e) => (
    <Item
      {...props}
      key={keyGen(e.id)}
      local={{ friend: e }}
    />
  ));

  return (
    <List
      local={{
        heading: "Friend Requests",
        list,
        refresh: friendGetList,
        type: "friend"
      }}
    />
  );

};

WrapList.propList = ["data.notifications.friends"];

WrapList.injected = {
  jsx: {
    Item,
    List
  }
};

//exports

module.exports = WrapList;
