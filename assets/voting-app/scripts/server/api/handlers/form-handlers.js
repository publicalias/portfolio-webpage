"use strict";

//local imports

const { checkOptions, checkTitle } = require("../../app-logic");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//form add option

const formAddOption = (req, res) => {

  const { add, options } = JSON.parse(req.query.data);

  const next = options.concat(add);

  const errors = checkOptions(next);

  res.json(errors.length ? { errors } : {
    form: {
      options: next,
      add: ""
    }
  });

};

//form set title

const formSetTitle = async (req, res) => {

  const { title } = JSON.parse(req.query.data);

  const exists = await pollsCol().findOne({ title });
  const errors = checkTitle(title, exists);

  res.json(errors.length ? { errors } : { form: { title } });

};

//exports

module.exports = {
  formAddOption,
  formSetTitle
};
