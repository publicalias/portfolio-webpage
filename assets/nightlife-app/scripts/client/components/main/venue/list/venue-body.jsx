"use strict";

//local imports

const MetaListBody = require("../../meta/meta-list-body");
const VenueItem = require("./venue-item");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//venue body

const VenueBody = (props) => {

  const { data: { venues: { data } }, local: { handleScroll } } = props;

  const { jsx: { MetaListBody, VenueItem } } = VenueBody.injected;

  //render

  const keyGen = initKeyGen();

  const header = (
    <div className="c-list-body__header--venues">
      <h1>Venues</h1>
      <a href="https://www.yelp.com/">
        <img
          alt="Yelp Logo"
          className="c-list-body__logo"
          src="/nightlife-app/media/yelp/logo.png"
        />
      </a>
    </div>
  );

  return (
    <MetaListBody
      local={{
        handleScroll,
        header
      }}
    >
      {data.map((e) => (
        <VenueItem
          key={keyGen(e.id)}
          local={{ venue: e }}
        />
      ))}
    </MetaListBody>
  );

};

VenueBody.propList = ["data.venues.data", "local"];

VenueBody.injected = {
  jsx: {
    MetaListBody,
    VenueItem
  }
};

//exports

module.exports = VenueBody;
