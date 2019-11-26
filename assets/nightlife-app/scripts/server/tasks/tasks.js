"use strict";

//local imports

const demoUsers = require("../../../media/demo-users");

const { friendAdd, friendConfirm } = require("../api/handlers/friend-handlers");
const { rsvpAdd } = require("../api/handlers/rsvp-handlers");
const { userToggleBlock } = require("../api/handlers/user-handlers");
const { venueGetList } = require("../api/handlers/venue-handlers");

const { newListParamsVenues, newUserWithData } = require("../../../schemas");

//global imports

const { botAPICall, hourly } = require("redux/server-utils");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const rsvpsCol = () => db.collection("nightlife-app/rsvps");
const userDataCol = () => db.collection("nightlife-app/user-data");

//tasks

const [FriendlyBot, , MisanthropicBot] = demoUsers.map(newUserWithData);

const botAcceptRequest = () => friendsCol()
  .watch([{
    $match: {
      "fullDocument.to.id": FriendlyBot.id,
      "operationType": "insert"
    }
  }])
  .on("change", ({ fullDocument: data }) => {
    setTimeout(() => {
      botAPICall(friendConfirm, "PATCH", FriendlyBot, { id: data.id });
    }, 3000);
  });

const botCreateRSVP = () => hourly(async () => {

  const exists = await rsvpsCol().findOne({ "user.id": FriendlyBot.id });

  if (exists) {
    return;
  }

  const res = await botAPICall(venueGetList, "GET", FriendlyBot, {
    params: newListParamsVenues(),
    length: 0,
    location: FriendlyBot.data.location
  });

  const [{ venues: { data: [{ id, name }] } }] = res.json.mock.calls[0];

  botAPICall(rsvpAdd, "POST", FriendlyBot, {
    name,
    id,
    time: "9:00 PM",
    message: "I love this place!"
  });

});

const botRejectRequest = () => friendsCol()
  .watch([{
    $match: {
      "fullDocument.to.id": MisanthropicBot.id,
      "operationType": "insert"
    }
  }])
  .on("change", ({ fullDocument: data }) => {
    setTimeout(() => {
      botAPICall(userToggleBlock, "PATCH", MisanthropicBot, { id: data.from.id });
    }, 3000);
  });

const botSendRequest = () => userDataCol()
  .watch([{ $match: { operationType: "insert" } }])
  .on("change", ({ fullDocument: data }) => {
    botAPICall(friendAdd, "POST", FriendlyBot, {
      name: data.name,
      id: data.id
    });
  });

const deleteOldRSVP = () => hourly(() => {

  const dayOld = Date.now() - 24 * 60 * 60 * 1000;

  rsvpsCol().deleteMany({ date: { $lte: dayOld } });

});

const deleteOldRequest = () => hourly(() => {

  const monthOld = Date.now() - 30 * 24 * 60 * 60 * 1000;

  friendsCol().deleteMany({
    date: { $lte: monthOld },
    confirmed: false
  });

});

const tasks = () => {

  botAcceptRequest();
  botCreateRSVP();
  botRejectRequest();
  botSendRequest();

  deleteOldRSVP();
  deleteOldRequest();

};

//exports

module.exports = tasks;
