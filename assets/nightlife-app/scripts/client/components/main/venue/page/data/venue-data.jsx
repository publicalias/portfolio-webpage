"use strict";

//local imports

const VenuePhotos = require("./venue-photos");

const { getHours } = require("../../../../../view-logic");

//global imports

const { initKeyGen } = require("all/react-utils");
const { delimit } = require("all/utilities");

//node modules

const React = require("react");

//venue data

const VenueData = (props) => {

  const { local: { venue } } = props;

  const { jsx: { VenuePhotos }, lib: { delimit, getHours } } = VenueData.injected;

  //render

  const keyGen = initKeyGen();

  const address = ((list = venue.location.display_address) => list.length ? list : ["No Address"])();

  const distance = delimit(venue.distance);

  return (
    <div className="c-venue-data">
      <div className="c-venue-data__header">
        <h1>{venue.name || "Undefined"}</h1>
        <img
          alt={`${venue.rating} Stars`}
          className="c-venue-data__rating"
          src={`/nightlife-app/media/yelp/stars/stars-${venue.rating}.png`}
        />
      </div>
      <hr />
      <div className="u-margin-full">
        <VenuePhotos {...props} />
      </div>
      <div className="c-venue-data__info">
        <div>
          {address.map((e) => <p key={keyGen(e)}>{e}</p>)}
        </div>
        <p className="u-align-right">{`${distance} Miles`}</p>
        <p className="u-margin-none">{venue.display_phone || "No Phone"}</p>
        <p className="u-align-right u-margin-none">{getHours(venue)}</p>
      </div>
    </div>
  );

};

VenueData.propList = ["local"];

VenueData.injected = {
  jsx: { VenuePhotos },
  lib: {
    delimit,
    getHours
  }
};

//exports

module.exports = VenueData;
