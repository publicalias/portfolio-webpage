"use strict";

//local imports

const { useVenueImage } = require("../../../../event-handlers");

//global imports

const { delimit } = require("all/utilities");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//venue item

const VenueItem = (props) => {

  const { local: { venue } } = props;

  const { jsx: { Link }, lib: { delimit, useVenueImage } } = VenueItem.injected;

  //events

  const handleError = (event) => {
    event.target.src = "https://via.placeholder.com/800x450?text=undefined";
  };

  //lifecycle

  const image = useVenueImage(`.js-resize-image-${venue.id}`, venue.image_url, 9);

  //render

  const distance = delimit(venue.distance);

  return (
    <Link to={`/venues/page/${venue.id}`}>
      <div className="c-list-item">
        <img
          alt="Venue Photo"
          className={`js-resize-image-${venue.id} qa-error-image`}
          onError={handleError}
          src={image}
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
    useVenueImage
  }
};

//exports

module.exports = VenueItem;
