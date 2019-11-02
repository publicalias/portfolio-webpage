"use strict";

//global imports

const { deepCopy } = require("all/utilities");

//meta set address

const META_SET_ADDRESS = (state, { address }) => deepCopy(state, { account: { address } });

//meta set avatar

const META_SET_AVATAR = (state, { avatar }) => deepCopy(state, { account: { avatar } });

//meta toggle loaded

const META_TOGGLE_LOADED = (state) => deepCopy(state, { account: { loaded: !state.account.loaded } });

//meta toggle settings

const META_TOGGLE_SETTINGS = (state) => deepCopy(state, { account: { settings: !state.account.settings } });

//exports

module.exports = {
  META_SET_ADDRESS,
  META_SET_AVATAR,
  META_TOGGLE_LOADED,
  META_TOGGLE_SETTINGS
};
