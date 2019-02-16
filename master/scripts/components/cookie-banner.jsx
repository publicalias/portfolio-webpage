"use strict";

//global imports

const { select } = require("dom-api");
const { initStorageKey } = require("utilities");

const storageKey = initStorageKey("cookie-banner");

//node modules

const React = require("react");

//cookie banner

const handleClick = () => {

  const DOMBanner = select(".js-hide-banner");

  DOMBanner.animate({ opacity: 0 }, () => {
    DOMBanner.class("is-hidden", true, true);
  });

  storageKey("consent", true);

};

const CookieBanner = () => !storageKey("consent") && (
  <div className="c-content--xl c-cookie-banner js-hide-banner">
    <p className="c-cookie-banner__text">This site uses cookies to facilitate user authentication. By continuing to use this site, you consent to its use of cookies.</p>
    <button className="c-cookie-banner__btn" onClick={handleClick}>OK</button>
  </div>
);

//exports

module.exports = CookieBanner;
