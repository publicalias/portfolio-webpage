"use strict";

//local imports

const MetaItem = require("../meta/meta-item");
const MetaUserLink = require("../meta/meta-user-link");
const MetaVenueLink = require("../meta/meta-venue-link");

//node modules

const React = require("react");

//rsvp item

const RSVPItem = (props) => {

  const { actions: { rsvpDismiss, rsvpRemove }, data: { user }, local: { rsvp } } = props;

  const { jsx: { MetaItem, MetaUserLink, MetaVenueLink } } = RSVPItem.injected;

  //utilities

  const type = user.id === rsvp.user.id ? "self" : "user";

  const userLink = <MetaUserLink local={{ user: rsvp.user }} />;
  const venueLink = <MetaVenueLink local={{ venue: rsvp.venue }} />;

  const { buttons, notification } = ((data) => data[type])({
    self: {
      buttons: [{
        handler: rsvpRemove,
        icon: "fas fa-ban"
      }],
      notification: <p>You are going to {venueLink} at {rsvp.time}.</p>
    },
    user: {
      buttons: [{
        handler: rsvpDismiss,
        icon: "fas fa-times"
      }],
      notification: <p>{userLink} is going to {venueLink} at {rsvp.time}.</p>
    }
  });

  const fragment = (
    <React.Fragment>
      {notification}
      {rsvp.message && <p>"{rsvp.message}"</p>}
    </React.Fragment>
  );

  return (
    <MetaItem
      local={{
        buttons,
        item: rsvp,
        notification: fragment
      }}
    />
  );

};

RSVPItem.propList = ["data.user", "local"];

RSVPItem.injected = {
  jsx: {
    MetaItem,
    MetaUserLink,
    MetaVenueLink
  }
};

//exports

module.exports = RSVPItem;
