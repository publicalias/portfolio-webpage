"use strict";

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//handle delete

const votingAppData = async (id) => {
  await Promise.all([
    pollsCol().deleteMany({ "users.created": id }),
    pollsCol().updateMany({ "options.created": id }, { $pull: { options: { created: id } } }),
    pollsCol().updateMany({ "users.voted": id }, {
      $pull: {
        "users.voted": id,
        "options.$[].voted": id
      }
    })
  ]);
};

const handleDelete = async (req, res) => {
  try {

    const { id } = req.user;

    await Promise.all([votingAppData(id)]);
    await usersCol().deleteOne({ id });

    req.logout();
    res.sendStatus(200);

  } catch (err) {
    res.sendStatus(500);
  }
};

//exports

module.exports = { handleDelete };
