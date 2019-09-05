"use strict";

//global imports

const { deepCopy } = require("all/utilities");

//meta set avatar

const META_SET_AVATAR = (state, { avatar }) => deepCopy(state, { account: { avatar } });

//meta set zip code

const META_SET_ZIP_CODE = (state, { zipCode }) => deepCopy(state, { account: { zipCode } });

//meta toggle settings

const META_TOGGLE_SETTINGS = (state) => deepCopy(state, { account: { settings: !state.account.settings } });

//exports

module.exports = {
  META_SET_AVATAR,
  META_SET_ZIP_CODE,
  META_TOGGLE_SETTINGS
};
