"use strict";

//global imports

const { select } = require("dom-api");
const { useInterval } = require("react-utils");

//node modules

const React = require("react");

const { useEffect } = React;

//error message

const ErrorMessage = (props) => {

  const { actions: { metaCloseError, metaTimeoutError }, data: { errors } } = props;

  //utilities

  const error = errors[0];

  const DOMError = select(".js-hide-error");

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
    <div className="c-error-message js-hide-error is-hidden" onClick={handleClick}>
      <p className="c-error-message__error">{error && error.text}</p>
      <p className="c-error-message__close"><i className="fa fa-times" /></p>
    </div>
  );

};

//exports

module.exports = ErrorMessage;
