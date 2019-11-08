"use strict";

//node modules

const React = require("react");

//swipe btn

const SwipeBtn = (props) => {

  const { handleClick, type } = props;

  return (
    <button
      className={`c-preview__swipe--${type}`}
      onClick={handleClick}
    >
      <i className={`fas fa-chevron-${type}`} />
    </button>
  );

};

//exports

module.exports = SwipeBtn;
