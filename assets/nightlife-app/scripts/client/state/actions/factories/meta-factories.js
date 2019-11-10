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

//meta set ready

const metaSetReady = (ready = false) => ({
  type: "META_SET_READY",
  ready
});

//meta toggle settings

const metaToggleSettings = () => ({ type: "META_TOGGLE_SETTINGS" });

//exports

module.exports = {
  metaSetAddress,
  metaSetAvatar,
  metaSetReady,
  metaToggleSettings
};
