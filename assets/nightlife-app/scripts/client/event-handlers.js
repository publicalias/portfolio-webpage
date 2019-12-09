"use strict";

//global imports

const { select } = require("all/dom-api");
const { hookEvent } = require("all/react-utils");

//node modules

const { useLayoutEffect } = require("react");

//use venue image

const getImage = (image, scale) => image.replace("o.jpg", (() => {

  const width = Math.max(window.innerHeight, window.innerWidth) * scale / 100; //no reload on rotate

  if (width < 40) {
    return "s.jpg";
  } else if (width < 100) {
    return "m.jpg";
  } else if (width < 400) {
    return "l.jpg";
  }

  return "o.jpg";

})());

const useVenueImage = (id, image, scale) => {

  useLayoutEffect(() => hookEvent(select(window), "resize", () => {
    select(id).src = getImage(image, scale);
  }));

  return getImage(image, scale);

};

//exports

module.exports = { useVenueImage };
