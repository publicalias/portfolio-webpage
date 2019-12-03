"use strict";

//node modules

const React = require("react");

//user controls

const UserControls = (props) => {

  const {
    actions: { friendAdd, friendRemove, userToggleBlock },
    data: { user, notifications: { friends } },
    local: { userData }
  } = props;

  //utilities

  const getFriend = (list) => list.find((e) => {

    const match = (a, b) => e.from.id === a.id && e.to.id === b.id;

    return match(user, userData) || match(userData, user);

  });

  const friend = getFriend(userData.data.friends);
  const request = getFriend(friends);

  const blocked = user.data.blocks.includes(userData.id);

  const [text, handler, disabled = false] = (() => {

    if (friend) {
      return ["Remove Friend", () => friendRemove(friend.id)];
    } else if (request) {
      return ["Pending", () => {}, true];
    }

    return ["Add Friend", () => friendAdd(userData.name, userData.id)];

  })();

  //events

  const handleFriend = handler;

  const handleBlock = () => userToggleBlock(userData.id);

  //render

  return (
    <div className="c-user-controls">
      <button
        className="qa-click-friend u-margin-right"
        disabled={disabled}
        onClick={handleFriend}
      >
        {text}
      </button>
      <button
        className="qa-toggle-block"
        onClick={handleBlock}
      >
        {blocked ? "Unblock" : "Block"}
      </button>
    </div>
  );

};

UserControls.propList = ["data.user", "data.notifications.friends", "local"];

//exports

module.exports = UserControls;
