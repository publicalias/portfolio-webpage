"use strict";

//local imports

const VenuePhotos = require("./venue-photos");

const { getHours } = require("../../../../view-logic");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//venue info

const VenueInfo = (props) => {

  const { local: { venue } } = props;

  const { lib: { getHours } } = VenueInfo.injected;

  //render

  const keyGen = initKeyGen();

  const address = ((list = venue.location.display_address) => list.length ? list : ["No Address"])();

  return (
    <div className="c-venue-page__info">
      <div className="c-venue-page__header">
        <h1 className="u-align-left">{venue.name || "Undefined"}</h1>
        <img
          alt={`${venue.rating} Stars`}
          className="c-venue-page__rating"
          src={`/nightlife-app/media/yelp-stars/yelp-stars-${venue.rating}.png`}
        />
      </div>
      <hr />
      <div className="u-margin-full">
        <VenuePhotos {...props} />
      </div>
      <div className="c-venue-page__data">
        <div>
          {address.map((e) => <p key={keyGen(e)}>{e}</p>)}
        </div>
        <p className="u-align-right">{`${venue.distance} Miles`}</p>
        <p className="u-margin-none">{venue.display_phone || "No Phone"}</p>
        <p className="u-align-right u-margin-none">{getHours(venue)}</p>
      </div>
    </div>
  );

};

VenueInfo.propList = ["local"];

VenueInfo.injected = { lib: { getHours } };

//exports

module.exports = VenueInfo;
