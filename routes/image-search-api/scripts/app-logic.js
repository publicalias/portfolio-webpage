"use strict";

//utilities

const createRes = (request, term = null, page = null, results = []) => ({
  request,
  term,
  page,
  results
});

const parseOffset = (offset) => {

  const n = Number(offset);

  return n > 1 ? Math.min(n, 10) : 1;

};

//api handler

const apiHandler = (req, res) => (err, status, body) => {

  if (err) {

    res.sendStatus(502);

    return;

  }

  const items = JSON.parse(body).items || [];

  const results = items.map((e) => ({
    image: e.link,
    text: e.title,
    context: e.image.contextLink
  }));

  const json = createRes("search", req.params.term, parseOffset(req.query.offset), results);

  res.header("Content-Type", "application/json").send(JSON.stringify(json, null, 2));

};

//read logs

const logHandler = (res) => (err, docs) => {

  if (err) {

    res.sendStatus(500);

    return;

  }

  const json = createRes("recent", null, null, docs);

  res.header("Content-Type", "application/json").send(JSON.stringify(json, null, 2));

};

const readLogs = (res) => (err, client) => {

  if (err) {

    res.sendStatus(500);

    return;

  }

  client.db()
    .collection("image-search-api/terms")
    .find({}, { projection: { _id: false } })
    .sort({ unix: -1 })
    .limit(10)
    .toArray(logHandler(res));

  client.close();

};

//start param

const startParam = (offset) => {

  const n = parseOffset(offset);

  return `&start=${(n - 1) * 10 + 1}`; //n = 1 shows results 1 to 10, n = 2 shows results 11 to 20

};

//upsert log

const upsertLog = (req) => (err, client) => {

  if (err) {
    return; //oh well
  }

  const term = req.params.term;

  const log = { $set: { unix: Date.now() } };

  client.db()
    .collection("image-search-api/terms")
    .updateOne({ term }, log, { upsert: true });

  client.close();

};

//exports

module.exports = {
  apiHandler,
  readLogs,
  startParam,
  upsertLog
};
