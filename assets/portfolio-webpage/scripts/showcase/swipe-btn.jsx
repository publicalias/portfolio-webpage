"use strict";

//swipe btn

const SwipeBtn = (props) => (
  <button
    className={`c-preview__swipe-btn--${props.mod}`}
    onClick={props.handleClick}
  >
    <i className={`fa fa-chevron-${props.mod}`} />
  </button>
);

//exports

module.exports = SwipeBtn;
