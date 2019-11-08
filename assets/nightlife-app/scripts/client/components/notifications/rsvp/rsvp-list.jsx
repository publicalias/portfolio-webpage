"use strict";

//local imports

const MetaList = require("../meta/meta-list");
const RSVPItem = require("./rsvp-item");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//rsvp list

const RSVPList = (props) => {

  const { actions: { rsvpGetList }, data: { notifications: { rsvps }, venues: { data } } } = props;

  const { jsx: { MetaList, RSVPItem } } = RSVPList.injected;

  //render

  const keyGen = initKeyGen();

  const list = rsvps.map((e) => (
    <RSVPItem
      {...props}
      key={keyGen(e.id)}
      local={{ rsvp: e }}
    />
  ));

  return (
    <MetaList
      local={{
        bool: JSON.stringify(data),
        heading: "RSVPs",
        list,
        refresh: rsvpGetList,
        type: "rsvp"
      }}
    />
  );

};

RSVPList.propList = ["data.notifications.rsvps", "data.venues.data"];

RSVPList.injected = {
  jsx: {
    MetaList,
    RSVPItem
  }
};

//exports

module.exports = RSVPList;
