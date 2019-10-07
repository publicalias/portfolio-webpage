"use strict";

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");
const friendsCol = () => db.collection("nightlife-app/friends");
const rsvpsCol = () => db.collection("nightlife-app/rsvps");
const userDataCol = () => db.collection("nightlife-app/user-data");

const pollsCol = () => db.collection("voting-app/polls");

//delete user data

const deleteUserData = (id) => Promise.all([

  //nightlife app

  favoritesCol().deleteMany({ "user.id": id }),
  friendsCol().deleteMany({ "from.id": id }),
  friendsCol().deleteMany({ "to.id": id }),
  rsvpsCol().deleteMany({ "user.id": id }),

  userDataCol().deleteOne({ id }),

  userDataCol().updateMany({ "data.blocks": id }, { $pull: { "data.blocks": id } }),

  //voting app

  pollsCol().deleteMany({ "users.created": id }),

  pollsCol().updateMany({ "users.hidden": id }, { $pull: { "users.hidden": id } }),
  pollsCol().updateMany({ "users.flagged": id }, { $pull: { "users.flagged": id } }),
  pollsCol().updateMany({ "options.created": id }, { $pull: { options: { created: id } } }),
  pollsCol().updateMany({ "options.voted": id }, { $pull: { "options.$[].voted": id } })

]);

//update user data

const updateUserData = (user) => Promise.all([

  //nightlife app

  favoritesCol().updateMany({ "user.id": user.id }, { $set: { "user.name": user.name } }),
  friendsCol().updateMany({ "from.id": user.id }, { $set: { "from.name": user.name } }),
  friendsCol().updateMany({ "to.id": user.id }, { $set: { "to.name": user.name } }),
  rsvpsCol().updateMany({ "user.id": user.id }, { $set: { "user.name": user.name } }),

  userDataCol().updateOne({ id: user.id }, { $set: { name: user.name } }),

  //voting app

  pollsCol().updateMany({ "users.created": user.id }, { $set: { author: user.name } })

]);

//exports

module.exports = {
  deleteUserData,
  updateUserData
};
