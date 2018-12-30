"use strict";

//local imports

const { initialState } = require("../initial-state");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//list get results

const LIST_GET_RESULTS = (state) => {

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

  return deepCopy(state, {
    list: {
      results: filters.reduce((acc, fn) => fn(acc), polls).map((e) => e.id),
      loaded: []
    }
  });

};

//list load polls

const LIST_LOAD_POLLS = (state, { load }) => {

  const { list: { results, loaded } } = state;

  const length = loaded.length;
  const updated = loaded.concat(results.slice(length, length + load));

  return deepCopy(state, { list: { loaded: updated } });

};

//list open view

const LIST_OPEN_VIEW = (state, { index }) => deepCopy(state, {
  page: "view",
  view: deepCopy(initialState.view, { poll: state.list.loaded[index] })
});

//list set search text

const LIST_SET_SEARCH_TEXT = (state, { search }) => deepCopy(state, { list: { search } });

//list set sort

const LIST_SET_SORT = (state, { sort }) => deepCopy(state, { list: { sort } });

//exports

module.exports = {
  LIST_GET_RESULTS,
  LIST_LOAD_POLLS,
  LIST_OPEN_VIEW,
  LIST_SET_SEARCH_TEXT,
  LIST_SET_SORT
};
