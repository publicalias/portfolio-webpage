"use strict";

//local imports

const MetaList = require("../meta/meta-list");
const RSVPItem = require("./rsvp-item");

//global imports

const { initKeyGen } = require("all/react-utils");
const { useRefresh } = require("redux/client-utils");

//node modules

const React = require("react");

//rsvp list

const RSVPList = (props) => {

  const { actions: { rsvpGetList }, data: { loading, log, notifications: { rsvps } } } = props;

  const { jsx: { MetaList, RSVPItem }, lib: { useRefresh } } = RSVPList.injected;

  //lifecycle

  useRefresh(rsvpGetList, loading, log, [
    "FRIEND_GET_LIST",
    "META_GET_USER",
    "RSVP_ADD",
    "RSVP_DISMISS",
    "RSVP_REMOVE"
  ]);

  //render

  const keyGen = initKeyGen();

  return (
    <MetaList
      {...props}
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

RSVPList.propList = ["data.loading", "data.log", "data.notifications.rsvps"];

RSVPList.injected = {
  jsx: {
    MetaList,
    RSVPItem
  },
  lib: { useRefresh }
};

//exports

module.exports = RSVPList;
