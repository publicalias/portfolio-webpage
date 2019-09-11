"use strict";

//utilities

const termsCol = () => db.collection("image-search-api/terms");

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

const apiHandler = (req, res, data) => {

  const { items = [] } = JSON.parse(data);

  const results = items.map((e) => ({
    image: e.link,
    text: e.title,
    context: e.image.contextLink
  }));

  const json = createRes("search", req.params.term, parseOffset(req.query.offset), results);

  res.header("Content-Type", "application/json").send(JSON.stringify(json, null, 2));

};

//read logs

const logHandler = (res, docs) => {

  const json = createRes("recent", null, null, docs);

  res.header("Content-Type", "application/json").send(JSON.stringify(json, null, 2));

};

const readLogs = async (req, res) => {
  try {

    const docs = await termsCol()
      .find({}, { projection: { _id: false } })
      .sort({ unix: -1 })
      .limit(10)
      .toArray();

    logHandler(res, docs);

  } catch {
    res.sendStatus(500);
  }
};

//start param

const startParam = (offset) => {

  const n = parseOffset(offset);

  return `&start=${(n - 1) * 10 + 1}`; //n = 1 shows results 1 to 10, n = 2 shows results 11 to 20

};

//upsert log

const upsertLog = async (term) => {

  const log = { $set: { unix: Date.now() } };

  await termsCol().updateOne({ term }, log, { upsert: true });

};

//exports

module.exports = {
  apiHandler,
  readLogs,
  startParam,
  upsertLog
};
