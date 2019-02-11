"use strict";

//node modules

const uuid = require("uuid/v1");

//utilities

const usersCol = () => db.collection("auth/users");

//find by id

const createUser = (profile) => {

  const { provider, id, displayName, emails } = profile;

  return {
    name: displayName,
    id: uuid(),
    type: "auth",
    auth: [{
      provider,
      id,
      emails: emails.map((e) => e.value)
    }],
    data: { restricted: false }
  };

};

const newUser = async (profile, fn) => {

  const user = createUser(profile);

  await usersCol().insertOne(user);

  fn(null, user);

};

const updateName = async (profile, fn, user) => {

  const { displayName } = profile;

  const data = { name: displayName };

  if (displayName === user.name) {

    fn(null, user);

    return;

  }

  Object.assign(user, data);

  await usersCol().updateOne({ id: user.id }, { $set: data });

  fn(null, user);

};

const updateAuth = async (profile, fn, user) => {

  const { provider, id, emails } = profile;

  user.auth.push({
    provider,
    id,
    emails: emails.map((e) => e.value)
  });

  await usersCol().updateOne({ id: user.id }, { $set: { auth: user.auth } });

  await updateName(profile, fn, user);

};

const findByEmail = async (profile, fn) => {

  const { emails } = profile;

  const doc = await usersCol().findOne({ "auth.emails": { $in: emails.map((e) => e.value) } });

  if (doc) {
    await updateAuth(profile, fn, doc);
  } else {
    await newUser(profile, fn);
  }

};

const findByID = async (accessToken, refreshToken, profile, fn) => {

  const { provider, id } = profile;

  try {

    const doc = await usersCol().findOne({
      auth: {
        $elemMatch: {
          provider,
          id
        }
      }
    });

    if (doc) {
      await updateName(profile, fn, doc);
    } else {
      await findByEmail(profile, fn);
    }

  } catch (err) {
    fn(err);
  }

};

//exports

module.exports = { findByID };
