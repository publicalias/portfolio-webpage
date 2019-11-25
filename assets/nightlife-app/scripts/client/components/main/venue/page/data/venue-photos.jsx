"use strict";

//local imports

const VenueImage = require("./venue-image");
const VenueLogo = require("./venue-logo");
const VenueSwipe = require("./venue-swipe");

const { getShown } = require("../../../../../view-logic");

//global imports

const { useCarousel } = require("all/components/carousel");

//node modules

const React = require("react");

//venue photos

const VenuePhotos = (props) => {

  const {
    actions: { venueSetPhoto, venueSetStart, venueSetPause },
    data: { venues: { page: { photos } } },
    local: { venue }
  } = props;

  const {
    jsx: { VenueImage, VenueLogo, VenueSwipe },
    lib: { getShown, useCarousel }
  } = VenuePhotos.injected;

  //lifecycle

  const handlers = useCarousel({
    actions: {
      setItem: venueSetPhoto,
      setPause: venueSetPause,
      setStart: venueSetStart
    },
    data: {
      item: photos.photo,
      list: venue.photos,
      pause: photos.pause,
      start: photos.start
    },
    local: { getShown }
  });

  const {
    events: { handleError, handleLoad, handleTouchEnd, handleTouchStart },
    utilities: { handlePause, handleTurn }
  } = handlers;

  //render

  const turn = venue.photos.length > 1;

  return (
    <div
      className="c-venue-photos js-ref-carousel qa-ref-carousel"
      onMouseEnter={handlePause(true)}
      onMouseLeave={handlePause()}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      {turn && (
        <React.Fragment>
          <VenueSwipe
            local={{
              handleClick: handleTurn(-1),
              type: "left"
            }}
          />
          <VenueSwipe
            local={{
              handleClick: handleTurn(1),
              type: "right"
            }}
          />
        </React.Fragment>
      )}
      <VenueLogo />
      <VenueImage
        local={{
          handleError,
          handleLoad,
          src: photos.photo,
          venue
        }}
      />
    </div>
  );

};

VenuePhotos.propList = ["data.venues.page.photos", "local"];

VenuePhotos.injected = {
  jsx: {
    VenueImage,
    VenueLogo,
    VenueSwipe
  },
  lib: {
    getShown,
    useCarousel
  }
};

//exports

module.exports = VenuePhotos;
