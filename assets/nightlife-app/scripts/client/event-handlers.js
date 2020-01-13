"use strict";

//global imports

const { select } = require("all/dom-api");
const { hookEvent, useSetState } = require("all/react-utils");

//node modules

const { useLayoutEffect } = require("react");

//use lazy loading

const useLazyLoading = (listID, itemID) => {

  const [state, setState] = useSetState({ visible: false });

  useLayoutEffect(() => {

    const DOMList = select(listID);
    const DOMItem = select(itemID);

    const isVisible = () => {

      const visible = DOMItem.offsetTop <= DOMList.scrollTop + DOMList.clientHeight;

      if (visible && !state.visible) {
        setState({ visible });
      }

    };

    DOMList.css({ position: "relative" });

    isVisible();

    return hookEvent(DOMList, "scroll", isVisible);

  }, [state.visible]);

  return state.visible;

};

//use venue image

const getImage = (image = "", scale) => image.replace("o.jpg", (() => {

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

module.exports = {
  useLazyLoading,
  useVenueImage
};
