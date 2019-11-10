"use strict";

//node modules

const React = require("react");

//venue logo

const VenueLogo = () => (
  <a href="https://www.yelp.com/">
    <img
      alt="Yelp Logo"
      className="c-venue-photos__logo"
      src="/nightlife-app/media/yelp-logo.png"
    />
  </a>
);

VenueLogo.propList = [];

//exports

module.exports = VenueLogo;
