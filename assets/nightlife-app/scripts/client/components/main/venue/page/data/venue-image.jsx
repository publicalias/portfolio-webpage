"use strict";

//local imports

const { useVenueImage } = require("../../../../../event-handlers");

//global imports

const { placeholder } = require("all/utilities");

//node modules

const React = require("react");

//venue image

const VenueImage = (props) => {

  const { local: { handleError: handleErrorEvent, handleLoad, src, venue } } = props;

  const { lib: { useVenueImage } } = VenueImage.injected;

  //events

  const handleError = (event) => {

    handleErrorEvent();

    event.target.src = placeholder(800, 450);

  };

  //lifecycle

  const image = useVenueImage(".js-resize-image", src, 50); //approximate

  //render

  return (
    <div className="c-venue-photos__wrapper js-fade-carousel">
      <a href={venue.url || "https://www.yelp.com/"}>
        <img
          alt="Venue Photo"
          className="c-venue-photos__image js-ref-image js-resize-image qa-ref-image"
          onError={handleError}
          onLoad={handleLoad}
          src={image}
        />
      </a>
    </div>
  );

};

VenueImage.propList = ["local"];

VenueImage.injected = { lib: { useVenueImage } };

//exports

module.exports = VenueImage;
