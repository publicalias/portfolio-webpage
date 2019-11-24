"use strict";

//node modules

const React = require("react");

//venue image

const VenueImage = (props) => {

  const { local: { handleError, handleLoad, src, venue } } = props;

  //render

  const util = src ? "" : "u-display-none"; //ref must exist

  return (
    <div className={`c-venue-photos__wrapper js-fade-carousel ${util}`}>
      <a href={venue.url}>
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
