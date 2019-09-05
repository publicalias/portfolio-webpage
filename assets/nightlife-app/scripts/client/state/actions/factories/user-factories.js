"use strict";

//user clear state

const userClearState = () => ({ type: "USER_CLEAR_STATE" });

//user set name

const userSetName = (name) => ({
  type: "USER_SET_NAME",
  name
});

//user set zip code

const userSetZipCode = (zipCode) => ({
  type: "USER_SET_ZIP_CODE",
  zipCode
});

//exports

module.exports = {
  userClearState,
  userSetName,
  userSetZipCode
};
