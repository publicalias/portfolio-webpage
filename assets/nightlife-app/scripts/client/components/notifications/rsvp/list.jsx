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

  const { actions: { rsvpGetList }, data: { notifications: { rsvps } } } = props;

  const { jsx: { Item, List } } = WrapList.injected;

  //render

  const keyGen = initKeyGen();

  const list = rsvps.map((e) => (
    <Item
      {...props}
      key={keyGen(e.id)}
      local={{ rsvp: e }}
    />
  ));

  return (
    <List
      local={{
        handler: rsvpGetList,
        heading: "RSVPs",
        list,
        type: "rsvp"
      }}
    />
  );

};

WrapList.propList = ["data.notifications.rsvps"];

WrapList.injected = {
  jsx: {
    Item,
    List
  }
};

//exports

module.exports = WrapList;
