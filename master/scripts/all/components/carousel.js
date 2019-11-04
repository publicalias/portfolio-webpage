"use strict";

//global imports

const { swipeEvent } = require("all/client-utils");
const { select } = require("all/dom-api");
const { bindObject, cycleItems } = require("all/utilities");

//carousel

const carousel = (props) => {

  const {
    actions: { setItem, setPause, setStart },
    data: { item, list, pause, start },
    local: { getShown, touch }
  } = props;

  const handlers = {

    //initialize carousel

    handleInit() {

      if (pause) {
        return;
      }

      const shown = getShown();

      if (shown && !start) {
        setStart(true);
      } else if (!shown && start) {
        setStart(false);
      }

    },

    //pause carousel

    handlePause(bool = false) {
      return () => {
        setPause(bool);
      };
    },

    //swipe end

    handleTouchEnd(event) {

      const { height, width } = select(".js-ref-carousel").rect();

      const swipe = {
        left: 1,
        right: -1
      };

      event.persist();
      touch.end = event;

      const to = swipeEvent(touch.start, touch.end, height, width);

      this.handleTurn(swipe[to])();

      this.handlePause()();

    },

    //swipe end

    handleTouchStart(event) {

      event.persist();
      touch.start = event;

      this.handlePause(true)();

    },

    //turn carousel

    handleTurn(delta) {
      return () => {
        if (delta) {
          setItem(cycleItems(list, item, delta));
        }
      };
    }

  };

  return bindObject(handlers);

};

//exports

module.exports = { carousel };
