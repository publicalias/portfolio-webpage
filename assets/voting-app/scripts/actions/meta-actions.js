"use strict";

//meta set state

const metaSetState = (merge) => ({
  type: "META_SET_STATE",
  merge
});

//exports

module.exports = { metaSetState };
