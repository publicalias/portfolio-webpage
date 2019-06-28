"use strict";

//global imports

const { select } = require("dom-api");
const { useInterval } = require("react-utils");

//node modules

const React = require("react");

const { useEffect } = React;

//error message

const ErrorMessage = (props) => {

  const { actions: { metaAddErrors, metaCloseError, metaTimeoutError }, data: { errors }, history, location } = props;

  //utilities

  const DOMError = select(".js-hide-error");

  const error = errors[0];

  const fadeIn = () => {
    if (error && (DOMError.class("is-hidden") || DOMError.css().opacity === "0")) {
      DOMError.class("is-hidden", true, false);
      DOMError.animate({ opacity: 1 });
    }
  };

  const fadeOut = () => {
    DOMError.animate({ opacity: 0 }, () => {

      if (errors.length === 1) {
        DOMError.class("is-hidden", true, true);
      }

      metaCloseError();

    });
  };

  //events

  const handleClick = fadeOut;

  //lifecycle

  useEffect(() => {

    const errors = new URLSearchParams(location.search).get("errors");

    if (errors) {

      history.replace("/");

      metaAddErrors(JSON.parse(errors));

    }

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
      <p className="c-error-message__close"><i className="fa fa-times" /></p>
    </div>
  );

};

//exports

module.exports = ErrorMessage;
