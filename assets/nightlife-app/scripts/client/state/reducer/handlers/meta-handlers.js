"use strict";

//global imports

const { deepCopy } = require("all/utilities");

//meta set address

const META_SET_ADDRESS = (state, { address }) => deepCopy(state, { account: { address } });

//meta set avatar

const META_SET_AVATAR = (state, { avatar }) => deepCopy(state, { account: { avatar } });

//meta set ready

const META_SET_READY = (state, { ready }) => deepCopy(state, { ready });

//meta toggle settings

const META_TOGGLE_SETTINGS = (state) => deepCopy(state, { account: { settings: !state.account.settings } });

//exports

module.exports = {
  META_SET_ADDRESS,
  META_SET_AVATAR,
  META_SET_READY,
  META_TOGGLE_SETTINGS
};
