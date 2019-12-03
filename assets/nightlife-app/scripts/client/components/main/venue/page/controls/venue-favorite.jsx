"use strict";

//node modules

const React = require("react");

//venue favorite

const VenueFavorite = (props) => {

  const {
    actions: { favoriteAdd, favoriteRemove },
    data: { user },
    local: { venue }
  } = props;

  //utilities

  const favorite = venue.favorites.find((e) => e.user.id === user.id);

  //events

  const handleClick = () => {
    if (favorite) {
      favoriteRemove(favorite.id);
    } else {
      favoriteAdd(venue.name, venue.id);
    }
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
