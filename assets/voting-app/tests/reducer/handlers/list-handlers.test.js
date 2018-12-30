"use strict";

/*eslint max-nested-callbacks:0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//reducer

describe("reducer", () => {

  const { listGetResults } = actions;

  const mockPoll = (e) => {

    const poll = {
      title: "",
      author: "",
      id: "",
      date: 0,
      private: false,
      users: {
        created: "",
        voted: [],
        hidden: []
      },
      options: []
    };

    const options = e.options && e.options.map((f) => deepCopy({ created: "" }, f));

    return deepCopy(poll, e, options);

  };

  const getState = (input, output, setup) => {

    const polls = input.map(mockPoll);
    const results = output.map((e) => e.id);

    const lastState = deepCopy(initialState, { polls }, setup);
    const nextState = deepCopy(lastState, { list: { results } });

    return {
      lastState,
      nextState
    };

  };

  it("accepts LIST_GET_RESULTS actions with filter all (default)", () => {

    const pollA = { id: "id-a" };
    const pollB = { private: true };
    const pollC = { users: { hidden: ["id-b"] } };

    const { lastState, nextState } = getState([pollA, pollB, pollC], [pollA], { user: { id: "id-b" } });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with filter created", () => {

    const pollA = {
      id: "id-a",
      users: { created: "id-c" }
    };
    const pollB = {
      id: "id-b",
      options: [{ created: "id-c" }]
    };
    const pollC = {};

    const { lastState, nextState } = getState([pollA, pollB, pollC], [pollA, pollB], {
      user: { id: "id-c" },
      list: { filter: "created" }
    });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with filter voted", () => {

    const pollA = {
      id: "id-a",
      users: { voted: ["id-b"] }
    };
    const pollB = {};

    const { lastState, nextState } = getState([pollA, pollB], [pollA], {
      user: { id: "id-b" },
      list: { filter: "voted" }
    });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with filter hidden", () => {

    const pollA = {
      id: "id-a",
      users: { hidden: ["id-b"] }
    };
    const pollB = {};

    const { lastState, nextState } = getState([pollA, pollB], [pollA], {
      user: { id: "id-b" },
      list: { filter: "hidden" }
    });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with searched", () => {

    const pollA = {
      title: "Title A",
      id: "id-a"
    };
    const pollB = {
      author: "Author A",
      id: "id-b"
    };
    const pollC = {};

    const { lastState, nextState } = getState([pollA, pollB, pollC], [pollA, pollB], { list: { searched: "a" } });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with sort new (default)", () => {

    const pollA = {
      id: "id-a",
      date: 0
    };
    const pollB = {
      id: "id-b",
      date: 1
    };

    const { lastState, nextState } = getState([pollA, pollB], [pollB, pollA]);

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with sort popular", () => {

    const pollA = {
      id: "id-a",
      users: { voted: [""] }
    };
    const pollB = {
      id: "id-b",
      users: { voted: ["", ""] }
    };

    const { lastState, nextState } = getState([pollA, pollB], [pollB, pollA], { list: { sort: "popular" } });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

});

test("reducer accepts LIST_LOAD_POLLS actions", () => {

  const { listLoadPolls } = actions;

  const results = ["", ""];

  const lastState = deepCopy(initialState, {
    list: {
      results,
      loaded: [""]
    }
  });
  const nextState = deepCopy(lastState, {
    list: {
      results,
      loaded: results
    }
  });

  expect(reducer(lastState, listLoadPolls(1))).toEqual(nextState);

});

test("reducer accepts LIST_OPEN_VIEW actions", () => {

  const { listOpenView } = actions;

  const poll = "id-a";

  const lastState = deepCopy(initialState, { list: { loaded: [poll] } });
  const nextState = deepCopy(lastState, {
    page: "view",
    view: deepCopy(initialState.view, { poll })
  });

  expect(reducer(lastState, listOpenView(0))).toEqual(nextState);

});

test("reducer accepts LIST_SET_SEARCH_TEXT actions", () => {

  const { listSetSearchText } = actions;

  const search = "a";

  const nextState = deepCopy(initialState, { list: { search } });

  expect(reducer(initialState, listSetSearchText(search))).toEqual(nextState);

});

test("reducer accepts LIST_SET_SORT actions", () => {

  const { listSetSort } = actions;

  const sort = "popular";

  const nextState = deepCopy(initialState, { list: { sort } });

  expect(reducer(initialState, listSetSort(sort))).toEqual(nextState);

});
