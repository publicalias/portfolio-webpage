"use strict";

//local imports

const MetaItem = require("../meta/meta-item");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//rsvp item

const RSVPItem = (props) => {

  const { actions: { rsvpDismiss, rsvpRemove }, data: { user }, local: { rsvp } } = props;

  const { jsx: { Link, MetaItem } } = RSVPItem.injected;

  //utilities

  const type = user.id === rsvp.user.id ? "self" : "user";

  const userLink = (
    <Link to={`/users/page/${rsvp.user.id}`}>
      <span className="u-underline">
        {rsvp.user.name || "Anonymous"}
      </span>
    </Link>
  );

  const venueLink = (
    <Link to={`/venues/page/${rsvp.venue.id}`}>
      <span className="u-underline">
        {rsvp.venue.name || "Undefined"}
      </span>
    </Link>
  );

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
    Link,
    MetaItem
  }
};

//exports

module.exports = RSVPItem;
