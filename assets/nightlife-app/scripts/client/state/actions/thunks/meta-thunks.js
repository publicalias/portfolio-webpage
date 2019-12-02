"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//meta get user

const metaGetUser = () => reduxAPICall({
  type: "META_GET_USER",
  path: "/nightlife-app/api/meta-get-user",
  method: "GET"
});

//meta save address

const metaSaveAddress = (address, location) => reduxAPICall({
  type: "META_SAVE_ADDRESS",
  path: "/nightlife-app/api/meta-save-address",
  method: "PATCH",
  data: {
    address,
    location
  }
});

//meta save avatar

const metaSaveAvatar = (avatar) => reduxAPICall({
  type: "META_SAVE_AVATAR",
  path: "/nightlife-app/api/meta-save-avatar",
  method: "PATCH",
  data: { avatar }
});

//exports

module.exports = {
  metaGetUser,
  metaSaveAddress,
  metaSaveAvatar
};
