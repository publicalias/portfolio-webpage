"use strict";

//meta set avatar

const metaSetAvatar = (avatar) => ({
  type: "META_SET_AVATAR",
  avatar
});

//meta set zip code

const metaSetZipCode = (zipCode) => ({
  type: "META_SET_ZIP_CODE",
  zipCode
});

//meta toggle settings

const metaToggleSettings = () => ({ type: "META_TOGGLE_SETTINGS" });

//exports

module.exports = {
  metaSetAvatar,
  metaSetZipCode,
  metaToggleSettings
};
