"use strict";

//global imports

const { swipeEvent } = require("all/client-utils");
const { select } = require("all/dom-api");
const { hookEvent } = require("all/react-utils");
const { cycleItems } = require("all/utilities");

//node modules

const React = require("react");

const { useEffect, useLayoutEffect, useRef } = React;

//use carousel

const useLifecycle = (props, ready, utilities) => {

  const {
    actions: { setItem, setStart },
    data: { list, pause, start },
    local: { getShown }
  } = props;

  //utilities

  const handleInit = () => {

    if (pause) {
      return;
    }

    const shown = getShown();

    if (shown && !start) {
      setStart(true);
    } else if (!shown && start) {
      setStart();
    }

  };

  const handleRotate = () => {

    const { handleTurn } = utilities;

    if (!start || pause) {
      return;
    }

    const loaded = select(".js-ref-image").complete;

    const id = (async () => {

      if (!loaded) {
        await new Promise((resolve) => {
          ready.resolve = resolve;
        });
      }

      return setTimeout(handleTurn(1), 5000);

    })();

    return async () => {

      if (ready.resolve) {
        ready.resolve();
      }

      clearTimeout(await id);

    };

  };

  //lifecycle

  const bool = JSON.stringify(list);

  useLayoutEffect(() => {
    setItem(list[0]);
  }, [bool]);

  useEffect(handleInit, [bool]);

  useEffect(() => hookEvent(select(window), "resize scroll", handleInit));

  useEffect(handleRotate);

};

const useCarousel = (props) => {

  const {
    actions: { setItem, setPause },
    data: { item, list }
  } = props;

  const { current: ready } = useRef({ resolve: null });
  const { current: touch } = useRef({ start: null });

  //utilities

  const utilities = {

    //pause

    handlePause(bool) {
      return () => {
        setPause(bool);
      };
    },

    //turn

    handleTurn(delta) {
      return () => {
        if (delta && list.length > 1) {
          select(".js-fade-carousel").animate({ opacity: 0 }, () => {
            setItem(cycleItems(list, item, delta));
          });
        }
      };
    }

  };

  //events

  const handleLoad = () => {
    select(".js-fade-carousel").animate({ opacity: 1 }, ready.resolve);
  };

  const events = {

    //error

    handleError: handleLoad,

    //load

    handleLoad,

    //swipe

    handleTouchEnd(event) {

      const { handlePause, handleTurn } = utilities;

      const { height, width } = select(".js-ref-carousel").rect();

      const swipe = {
        left: 1,
        right: -1
      };

      const to = swipeEvent(touch.start, event, height, width);

      handleTurn(swipe[to])();

      handlePause()();

    },

    //swipe

    handleTouchStart(event) {

      const { handlePause } = utilities;

      event.persist();
      touch.start = event;

      handlePause(true)();

    }

  };

  //lifecycle

  useLifecycle(props, ready, utilities);

  //return

  return {
    events,
    utilities
  };

};

//exports

module.exports = { useCarousel };
