"use strict";

//global imports

const { handleAuthFail } = require("redux/server-utils");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");

//handle auth friend

const handleAuthFriend = (allowFrom, allowTo) => async (req, res) => {

  const { id } = req.body.data || JSON.parse(req.query.data);

  const { from, to } = await friendsCol().findOne({ id });

  handleAuthFail(req, res, (id) => {

    if (allowFrom && allowTo) {
      return id !== from.id && id !== to.id;
    } else if (allowFrom) {
      return id !== from.id;
    }

    return id !== to.id;

  });

};

//exports

module.exports = { handleAuthFriend };
