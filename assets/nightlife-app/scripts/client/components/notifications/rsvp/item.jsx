"use strict";

//global imports

const { readDate } = require("all/utilities");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//item

const Item = (props) => {

  const { actions: { rsvpGetList, rsvpDismiss, rsvpRemove }, data: { user }, local: { rsvp } } = props;

  const { jsx: { Link } } = Item.injected;

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

  const { handler, icon, notification } = ((data) => data[type])({
    self: {
      handler: rsvpRemove,
      icon: "fas fa-ban",
      notification: <p>You are going to {venueLink} at {rsvp.time}.</p>
    },
    user: {
      handler: rsvpDismiss,
      icon: "fas fa-times",
      notification: <p>{userLink} is going to {venueLink} at {rsvp.time}.</p>
    }
  });

  //events

  const handleClick = async () => {

    await handler(rsvp.id);

    rsvpGetList();

  };

  //render

  return (
    <div className="c-rsvp-item">
      <div className="c-rsvp-item__info">
        {notification}
        {rsvp.message && <p>"{rsvp.message}"</p>}
        <p className="u-margin-none">{readDate(rsvp.date)}</p>
      </div>
      <div className="c-rsvp-item__actions">
        <button
          className="c-rsvp-item__dismiss qa-dismiss-rsvp"
          onClick={handleClick}
        >
          <i className={icon} />
        </button>
      </div>
    </div>
  );

};

Item.propList = ["data.user", "local"];

Item.injected = { jsx: { Link } };

//exports

module.exports = Item;
