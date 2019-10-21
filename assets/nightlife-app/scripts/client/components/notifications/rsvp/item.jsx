"use strict";

//local imports

const Item = require("../meta/item");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//wrap item

const WrapItem = (props) => {

  const { actions: { rsvpGetList, rsvpDismiss, rsvpRemove }, data: { user }, local: { rsvp } } = props;

  const { jsx: { Item, Link } } = WrapItem.injected;

  //utilities

  const type = user.id === rsvp.user.id ? "self" : "user";

  const userLink = (
    <Link
      to={`/users/page/${rsvp.user.id}`}
    >
      <span className="u-underline">
        {rsvp.user.name || "Anonymous"}
      </span>
    </Link>
  );

  const venueLink = (
    <Link
      to={`/venues/page/${rsvp.venue.id}`}
    >
      <span className="u-underline">
        {rsvp.venue.name}
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
    <Item
      local={{
        buttons,
        item: rsvp,
        notification: fragment,
        refresh: rsvpGetList
      }}
    />
  );

};

WrapItem.propList = ["data.user", "local"];

WrapItem.injected = {
  jsx: {
    Item,
    Link
  }
};

//exports

module.exports = WrapItem;
