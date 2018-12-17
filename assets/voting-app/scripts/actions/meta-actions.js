"use strict";

//meta set state

const metaSetState = (merge, options = { shallow: false }) => ({
  type: "META_SET_STATE",
  merge,
  options
});

//exports

module.exports = { metaSetState };
