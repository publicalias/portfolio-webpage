"use strict";

//local imports

const { useLazyLoading, useVenueImage } = require("../../../../event-handlers");

//global imports

const { delimit } = require("all/utilities");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//venue item

const VenueItem = (props) => {

  const { local: { venue } } = props;

  const { jsx: { Link }, lib: { delimit, useLazyLoading, useVenueImage } } = VenueItem.injected;

  //events

  const handleError = (event) => {
    event.target.src = "https://via.placeholder.com/800x450?text=undefined";
  };

  //lifecycle

  const image = useVenueImage(`.js-resize-image-${venue.id}`, venue.image_url, 9);

  const visible = useLazyLoading(".js-ref-list", `.js-ref-item-${venue.id}`);

  //render

  const distance = delimit(venue.distance);

  return (
    <Link to={`/venues/page/${venue.id}`}>
      <div className={`c-list-item js-ref-item-${venue.id}`}>
        <img
          alt="Venue Photo"
          className={`js-resize-image-${venue.id} qa-error-image`}
          onError={handleError}
          src={visible ? image : "https://via.placeholder.com/800x450?text=undefined"}
        />
        <div>
          <h5 className="u-margin-half">{venue.name || "Undefined"}</h5>
          <p>{`${distance} Miles`}</p>
          <img
            alt={`${venue.rating} Stars`}
            className="u-widget-width"
            src={`/nightlife-app/media/yelp/stars/stars-${venue.rating}.png`}
          />
        </div>
      </div>
    </Link>
  );

};

VenueItem.propList = ["local"];

VenueItem.injected = {
  jsx: { Link },
  lib: {
    delimit,
    useLazyLoading,
    useVenueImage
  }
};

//exports

module.exports = VenueItem;
