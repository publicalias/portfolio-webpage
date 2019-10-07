"use strict";

//local imports

const { updateUserData } = require("../app-logic");

//global imports

const { newUser } = require("redux/schemas");

//node modules

const uuid = require("uuid/v1");

//utilities

const usersCol = () => db.collection("auth/users");

//find user

const updateUser = async (profile, fn, id) => {

  const { displayName } = profile;

  const { value: user } = await usersCol().findOneAndUpdate({ id }, { $set: { name: displayName || "" } });

  await updateUserData(user);

  fn(null, user);

};

const createUser = async (profile, fn) => {

  const { provider, id, displayName } = profile;

  const user = newUser({
    name: displayName || "",
    id: uuid(),
    auth: {
      provider,
      id
    }
  });

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
      await updateUser(profile, fn, doc.id);
    } else {
      await createUser(profile, fn);
    }

  } catch (err) {
    fn(err);
  }

};

//exports

module.exports = { findUser };
