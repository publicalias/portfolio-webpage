"use strict";

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//venue item

const VenueItem = (props) => {

  const { local: { venue } } = props;

  const { jsx: { Link } } = VenueItem.injected;

  //events

  const handleError = (event) => {
    event.target.src = "https://via.placeholder.com/100x100?text=undefined";
  };

  //render

  return (
    <Link to={`/venues/page/${venue.id}`}>
      <div className="c-list-item">
        <img
          alt="Venue Photo"
          className="qa-error-image"
          onError={handleError}
          src={venue.image_url}
        />
        <div>
          <h5 className="u-margin-half">{venue.name}</h5>
          <p>{`${venue.distance} Miles`}</p>
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

VenueItem.injected = { jsx: { Link } };

//exports

module.exports = VenueItem;
