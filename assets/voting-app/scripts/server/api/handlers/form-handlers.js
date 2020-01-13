"use strict";

//local imports

const { checkOptions, checkTitle } = require("../../app-logic");

//global imports

const { handleAPICall, handleErrors } = require("redux/server-utils");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//form add option

const formAddOption = handleAPICall({

  errors(req, res) {

    const { add, options } = JSON.parse(req.query.data);

    const all = options.concat(add);

    handleErrors(res, checkOptions(all));

    return all;

  },

  success(req, res, all) {
    res.json({
      form: {
        body: {
          options: all,
          add: ""
        }
      }
    });
  }

});

//form check title

const formCheckTitle = handleAPICall({

  async errors(req, res) {

    const { title } = JSON.parse(req.query.data);

    const exists = await pollsCol().findOne({ title });

    handleErrors(res, checkTitle(title, exists));

  },

  success(req, res) {
    res.json({});
  }

});

//exports

module.exports = {
  formAddOption,
  formCheckTitle
};
