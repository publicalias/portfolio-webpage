"use strict";

//local imports

const { metaSetState, metaAddErrors } = require("./actions/factories/meta-factories");

//global imports

const { getJSON } = require("utilities");

//filter polls

const filterPolls = (state) => {

  const { user, polls, list } = state;

  const applyFilter = (polls) => {

    const hidden = (e) => e.users.hidden.includes(user.id);
    const created = (obj) => obj.created === user.id;

    switch (list.filter) {
      case "all":
        return polls.filter((e) => !e.private && !hidden(e));
      case "created":
        return polls.filter((e) => created(e.users) || e.options.filter(created).length);
      case "voted":
        return polls.filter((e) => e.users.voted.includes(user.id));
      case "hidden":
        return polls.filter((e) => hidden(e));
    }

  };

  const applySearched = (polls) => {

    const includes = (str) => str.toLowerCase().includes(list.searched.toLowerCase());

    return polls.filter((e) => includes(e.title) || includes(e.author));

  };

  const applySort = (polls) => {

    switch (list.sort) {
      case "new":
        return polls.sort((a, b) => b.date - a.date);
      case "popular":
        return polls.sort((a, b) => b.users.voted.length - a.users.voted.length);
    }

  };

  const filters = [
    applyFilter,
    applySearched,
    applySort
  ];

  return filters.reduce((acc, fn) => fn(acc), polls).map((e) => e.id);

};

//redux api call

const reduxAPICall = (dispatch, path, body, success, failure) => {

  const bodyObj = body && {
    method: "POST",
    body,
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const successFn = success || ((res) => {
    dispatch(metaSetState(res));
  });

  const failureFn = failure || ((err) => {
    dispatch(metaAddErrors([err.message]));
  });

  return getJSON(path, bodyObj)
    .then(successFn)
    .catch(failureFn);

};

module.exports = {
  filterPolls,
  reduxAPICall
};
