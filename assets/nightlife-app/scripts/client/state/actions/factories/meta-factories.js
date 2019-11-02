"use strict";

//meta set address

const metaSetAddress = (address) => ({
  type: "META_SET_ADDRESS",
  address
});

//meta set avatar

const metaSetAvatar = (avatar) => ({
  type: "META_SET_AVATAR",
  avatar
});

//meta toggle loaded

const metaToggleLoaded = () => ({ type: "META_TOGGLE_LOADED" });

//meta toggle settings

const metaToggleSettings = () => ({ type: "META_TOGGLE_SETTINGS" });

//exports

module.exports = {
  metaSetAddress,
  metaSetAvatar,
  metaToggleLoaded,
  metaToggleSettings
};
