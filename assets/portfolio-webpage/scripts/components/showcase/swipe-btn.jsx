"use strict";

//node modules

const React = require("react");

//swipe btn

const SwipeBtn = (props) => {

  const { handleClick, mod } = props;

  return (
    <button
      className={`c-preview__swipe-btn--${mod}`}
      onClick={handleClick}
    >
      <i className={`fa fa-chevron-${mod}`} />
    </button>
  );

};

//exports

module.exports = SwipeBtn;
