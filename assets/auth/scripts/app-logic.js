"use strict";

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//handle delete

const deleteVotingApp = async (id) => {
  await Promise.all([
    pollsCol().deleteMany({ "users.created": id }),
    pollsCol().updateMany({ "options.created": id }, { $pull: { options: { created: id } } }),
    pollsCol().updateMany({ "options.voted": id }, {
      $inc: { "users.voted": -1 },
      $pull: { "options.$[].voted": id }
    })
  ]);
};

const handleDelete = async (req, res) => {
  try {

    const { user: { id } } = req;

    await Promise.all([deleteVotingApp(id)]);

    await usersCol().deleteOne({ id });

    req.logout();
    res.sendStatus(200);

  } catch {
    res.sendStatus(500);
  }
};

//handle update

const updateVotingApp = async (user) => {
  await pollsCol().updateMany({ "users.created": user.id }, { $set: { author: user.name } });
};

const handleUpdate = async (user) => {
  await Promise.all([updateVotingApp(user)]);
};

//exports

module.exports = {
  handleDelete,
  handleUpdate
};
