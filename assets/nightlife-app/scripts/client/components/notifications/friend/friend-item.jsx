"use strict";

//local imports

const MetaItem = require("../meta/meta-item");
const MetaUserLink = require("../meta/meta-user-link");

//node modules

const React = require("react");

//friend item

const FriendItem = (props) => {

  const {
    actions: { friendConfirm, friendDismiss, friendRemove },
    data: { user },
    local: { friend }
  } = props;

  const { jsx: { MetaItem, MetaUserLink } } = FriendItem.injected;

  //utilities

  const type = user.id === friend.from.id ? "from" : "to";
  const status = friend.confirmed ? "confirmed" : "unconfirmed";

  const userLink = <MetaUserLink local={{ user: type === "from" ? friend.to : friend.from }} />;

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
    <MetaItem
      local={{
        buttons,
        item: friend,
        notification
      }}
    />
  );

};

FriendItem.propList = ["data.user", "local"];

FriendItem.injected = {
  jsx: {
    MetaItem,
    MetaUserLink
  }
};

//exports

module.exports = FriendItem;
