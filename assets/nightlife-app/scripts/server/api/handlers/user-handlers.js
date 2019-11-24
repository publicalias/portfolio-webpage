"use strict";

//local imports

const { checkSearch, findUserItem, findUserList } = require("../../app-logic");

//global imports

const { checkErrors } = require("all/utilities");
const { handleAPICall, handleAuthFail, handleErrors } = require("redux/server-utils");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

//user get item

const userGetItem = async (req, res) => {

  const { id, location } = JSON.parse(req.query.data);

  const user = location && await findUserItem(req.user, id, location);

  res.json({ users: { data: user ? [user] : [] } });

};

//user get list

const userGetList = handleAPICall({

  errors(req, res) {

    const { params } = JSON.parse(req.query.data);

    handleErrors(res, checkSearch(params));

  },

  async success(req, res) {

    const { params, length, location } = JSON.parse(req.query.data);

    const users = location && Array(length).concat(await findUserList(params, length, location));

    res.json({ users: { data: users || [] } });

  }

});

//user toggle block

const userToggleBlock = handleAPICall({

  failure(req, res) {

    const { id } = req.body.data;

    handleAuthFail(req, res, () => id === req.user.id);

  },

  errors(req, res) {

    const { id } = req.body.data;

    handleErrors(res, checkErrors([{
      bool: !id,
      text: "User does not exist"
    }]));

  },

  async success(req, res) {

    const { id } = req.body.data;

    const { data: { blocks } } = await userDataCol().findOne({ id: req.user.id });

    const bool = blocks.includes(id);

    await userDataCol().updateOne({ id: req.user.id }, {
      [bool ? "$pull" : "$addToSet"]: { "data.blocks": id }
    });

    if (!bool) {
      await friendsCol().deleteOne({
        $or: [{
          "from.id": req.user.id,
          "to.id": id
        }, {
          "from.id": id,
          "to.id": req.user.id
        }]
      });
    }

    res.json({});

  }

});

//exports

module.exports = {
  userGetItem,
  userGetList,
  userToggleBlock
};
