"use strict";

//node modules

const React = require("react");

//venue swipe

const VenueSwipe = (props) => {

  const { local: { handleClick, type } } = props;

  //render

  return (
    <button
      className={`c-venue-photos__swipe--${type} qa-click-swipe`}
      onClick={handleClick}
    >
      <i className={`fas fa-chevron-${type}`} />
    </button>
  );

};

VenueSwipe.propList = ["local"];

//exports

module.exports = VenueSwipe;
