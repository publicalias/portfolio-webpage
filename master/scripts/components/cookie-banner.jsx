"use strict";

//local imports

const { initStorageKey } = require("../client-utils");
const { select } = require("../dom-api");

const storageKey = initStorageKey("cookie-banner");

//node modules

const React = require("react");

//cookie banner

const CookieBanner = () => {

  //events

  const handleClick = () => {

    const DOMBanner = select(".js-hide-banner");

    DOMBanner.animate({ opacity: 0 }, () => {
      DOMBanner.class("is-hidden", true, true);
    });

    storageKey("consent", true);

  };

  //render

  return !storageKey("consent") && (
    <div className="c-content--xl c-cookie-banner js-hide-banner">
      <p className="c-cookie-banner__text">This site uses cookies to facilitate user authentication. By continuing to use this site, you <s>surrender your firstborn child</s> consent to its use of cookies.</p>
      <button className="c-cookie-banner__btn" onClick={handleClick}>OK</button>
    </div>
  );

};

CookieBanner.propList = [];

//exports

module.exports = CookieBanner;
