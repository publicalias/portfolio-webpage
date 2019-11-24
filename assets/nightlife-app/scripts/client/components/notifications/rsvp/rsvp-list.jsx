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

  const { actions: { rsvpGetList }, data: { notifications: { rsvps } } } = props;

  const { jsx: { MetaList, RSVPItem } } = RSVPList.injected;

  //render

  const keyGen = initKeyGen();

  return (
    <MetaList
      local={{
        heading: "RSVPs",
        refresh: rsvpGetList,
        type: "rsvp"
      }}
    >
      {rsvps.map((e) => (
        <RSVPItem
          {...props}
          key={keyGen(e.id)}
          local={{ rsvp: e }}
        />
      ))}
    </MetaList>
  );

};

RSVPList.propList = ["data.notifications.rsvps"];

RSVPList.injected = {
  jsx: {
    MetaList,
    RSVPItem
  }
};

//exports

module.exports = RSVPList;
