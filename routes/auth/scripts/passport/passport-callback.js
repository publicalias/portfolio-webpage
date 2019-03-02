"use strict";

//local imports

const { handleUpdate } = require("../app-logic");

//node modules

const uuid = require("uuid/v1");

//utilities

const usersCol = () => db.collection("auth/users");

//find user

const updateUser = async (profile, fn, user) => {

  const { provider, id, displayName } = profile;

  user.name = displayName || "";
  user.auth = {
    provider,
    id
  };

  await Promise.all([
    usersCol().updateOne({ id: user.id }, { $set: user }),
    handleUpdate(user)
  ]);

  fn(null, user);

};

const createUser = async (profile, fn) => {

  const { provider, id, displayName } = profile;

  const user = {
    name: displayName || "",
    id: uuid(),
    type: "auth",
    auth: {
      provider,
      id
    },
    data: { restricted: false }
  };

  await usersCol().insertOne(user);

  fn(null, user);

};

const findUser = async (accessToken, refreshToken, profile, fn) => {

  const { provider, id } = profile;

  try {

    const doc = await usersCol().findOne({
      auth: {
        provider,
        id
      }
    });

    if (doc) {
      await updateUser(profile, fn, doc);
    } else {
      await createUser(profile, fn);
    }

  } catch (err) {
    fn(err);
  }

};

//exports

module.exports = { findUser };