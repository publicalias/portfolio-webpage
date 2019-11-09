"use strict";

//node modules

const React = require("react");

//venue favorite

const VenueFavorite = (props) => {

  const {
    actions: { favoriteAdd, favoriteRemove },
    data: { user },
    local: { refresh, venue }
  } = props;

  //utilities

  const favorite = venue.favorites.find((e) => e.user.id === user.id);

  //events

  const handleClick = async () => {

    if (favorite) {
      await favoriteRemove(favorite.id);
    } else {
      await favoriteAdd(venue.name, venue.id);
    }

    refresh();

  };

  //render

  return (
    <button
      className="c-icon-button qa-toggle-favorite"
      onClick={handleClick}
    >
      <i className={favorite ? "fas fa-star" : "far fa-star"} />
    </button>
  );

};

VenueFavorite.propList = ["data.user", "local"];

//exports

module.exports = VenueFavorite;
