"use strict";

//local imports

const Item = require("../meta/item");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//wrap item

const WrapItem = (props) => {

  const {
    actions: { friendConfirm, friendDismiss, friendGetList, friendRemove },
    data: { user },
    local: { friend }
  } = props;

  const { jsx: { Item, Link } } = WrapItem.injected;

  //utilities

  const type = user.id === friend.from.id ? "from" : "to";
  const status = friend.confirmed ? "confirmed" : "unconfirmed";

  const userLink = ((user = type === "from" ? friend.to : friend.from) => (
    <Link
      to={`/users/page/${user.id}`}
    >
      <span className="u-underline">
        {user.name || "Anonymous"}
      </span>
    </Link>
  ))();

  const confirm = {
    handler: friendConfirm,
    icon: "fas fa-check"
  };

  const remove = {
    handler: friendRemove,
    icon: "fas fa-ban"
  };

  const dismiss = {
    handler: friendDismiss,
    icon: "fas fa-times"
  };

  const { buttons, notification } = ((data) => data[status][type])({
    confirmed: {
      from: {
        buttons: [dismiss],
        notification: <p>{userLink} accepted your friend request.</p>
      },
      to: {
        buttons: [dismiss],
        notification: <p>You accepted {userLink}'s friend request.</p>
      }
    },
    unconfirmed: {
      from: {
        buttons: [remove],
        notification: <p>You sent {userLink} a friend request.</p>
      },
      to: {
        buttons: [confirm, remove],
        notification: <p>{userLink} sent you a friend request.</p>
      }
    }
  });

  //render

  return (
    <Item
      local={{
        buttons,
        item: friend,
        notification,
        refresh: friendGetList
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
