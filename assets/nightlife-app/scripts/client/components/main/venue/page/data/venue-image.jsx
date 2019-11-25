"use strict";

//node modules

const React = require("react");

//venue image

const VenueImage = (props) => {

  const { local: { handleError: handleErrorEvent, handleLoad, src, venue } } = props;

  //events

  const handleError = (event) => {

    handleErrorEvent();

    event.target.src = "https://via.placeholder.com/800x450?text=undefined";

  };

  //render

  return (
    <div className="c-venue-photos__wrapper js-fade-carousel">
      <a href={venue.url || "https://www.yelp.com/"}>
        <img
          alt="Venue Photo"
          className="c-venue-photos__image js-ref-image qa-ref-image"
          onError={handleError}
          onLoad={handleLoad}
          src={src}
        />
      </a>
    </div>
  );

};

VenueImage.propList = ["local"];

//exports

module.exports = VenueImage;
