"use strict";

//global imports

const { select } = require("all/dom-api");
const { useInterval } = require("all/react-utils");

//node modules

const React = require("react");

const { useEffect, useRef } = React;

//error message

const ErrorMessage = (props) => {

  const {
    actions: { metaAddErrors, metaCloseError, metaTimeoutError },
    data: { errors },
    history,
    location
  } = props;

  //utilities

  const animated = useRef(false);

  const error = errors[0];

  const fadeIn = () => {

    const DOMError = select(".js-hide-error");

    const visible = !DOMError.class("is-hidden") && DOMError.css().opacity !== "0";

    if (animated.current || !error || visible) {
      return;
    }

    animated.current = true;

    DOMError.class("is-hidden", true, false);

    DOMError.animate({ opacity: 1 }, () => {
      animated.current = false;
    });

  };

  const fadeOut = () => {

    const DOMError = select(".js-hide-error");

    if (animated.current) {
      return;
    }

    animated.current = true;

    DOMError.animate({ opacity: 0 }, () => {

      if (errors.length === 1) {
        DOMError.class("is-hidden", true, true);
      }

      metaCloseError();

      animated.current = false;

    });

  };

  //events

  const handleClick = fadeOut;

  //lifecycle

  useEffect(() => {

    const { hash, pathname, search } = location;

    const params = new URLSearchParams(search);
    const errors = params.get("errors");

    if (!errors) {
      return;
    }

    params.delete("errors");
    history.replace(`${pathname}?${params}${hash}`);

    metaAddErrors(JSON.parse(errors));

  }, []);

  useEffect(fadeIn);

  useInterval(() => {
    if (error.timer >= 100) {

      metaTimeoutError();

      if (error.timer === 100) {
        fadeOut();
      }

    }
  }, error && 100);

  //render

  return (
    <div className="c-error-message is-hidden js-hide-error" onClick={handleClick}>
      <p className="c-error-message__error">{error && error.text}</p>
      <p className="c-error-message__close"><i className="fas fa-times" /></p>
    </div>
  );

};

ErrorMessage.propList = ["data.errors", "location"];

//exports

module.exports = ErrorMessage;
