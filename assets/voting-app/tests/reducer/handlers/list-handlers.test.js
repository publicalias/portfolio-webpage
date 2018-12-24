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
    const results = output.map(mockPoll);

    const lastState = deepCopy(initialState, { polls }, setup);
    const nextState = deepCopy(lastState, { list: { results } });

    return {
      lastState,
      nextState
    };

  };

  it("accepts LIST_GET_RESULTS actions with filter all (default)", () => {

    const pollA = {};
    const pollB = { private: true };
    const pollC = { users: { hidden: ["id-a"] } };

    const { lastState, nextState } = getState([pollA, pollB, pollC], [pollA], { user: { id: "id-a" } });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with filter created", () => {

    const pollA = { users: { created: "id-a" } };
    const pollB = { options: [{ created: "id-a" }] };
    const pollC = {};

    const { lastState, nextState } = getState([pollA, pollB, pollC], [pollA, pollB], {
      user: { id: "id-a" },
      list: { filter: "created" }
    });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with filter voted", () => {

    const pollA = { users: { voted: ["id-a"] } };
    const pollB = {};

    const { lastState, nextState } = getState([pollA, pollB], [pollA], {
      user: { id: "id-a" },
      list: { filter: "voted" }
    });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with filter hidden", () => {

    const pollA = { users: { hidden: ["id-a"] } };
    const pollB = {};

    const { lastState, nextState } = getState([pollA, pollB], [pollA], {
      user: { id: "id-a" },
      list: { filter: "hidden" }
    });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with searched", () => {

    const pollA = { title: "Title A" };
    const pollB = { author: "Author A" };
    const pollC = {};

    const { lastState, nextState } = getState([pollA, pollB, pollC], [pollA, pollB], { list: { searched: "a" } });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with sort new (default)", () => {

    const pollA = { date: 0 };
    const pollB = { date: 1 };

    const { lastState, nextState } = getState([pollA, pollB], [pollB, pollA]);

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

  it("accepts LIST_GET_RESULTS actions with sort popular", () => {

    const pollA = { users: { voted: [""] } };
    const pollB = { users: { voted: ["", ""] } };

    const { lastState, nextState } = getState([pollA, pollB], [pollB, pollA], { list: { sort: "popular" } });

    expect(reducer(lastState, listGetResults())).toEqual(nextState);

  });

});

test("reducer accepts LIST_LOAD_POLLS actions", () => {

  const { listLoadPolls } = actions;

  const results = [{}, {}];

  const lastState = deepCopy(initialState, {
    list: {
      results,
      loaded: [{}]
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

  const poll = { id: "id-a" };

  const lastState = deepCopy(initialState, { list: { loaded: [poll] } });
  const nextState = deepCopy(lastState, {
    page: "view",
    view: deepCopy(initialState.view, { poll })
  });

  expect(reducer(lastState, listOpenView(0))).toEqual(nextState);

});

test("reducer accepts LIST_SET_SEARCH_TEXT actions", () => {

  const { listSetSearchText } = actions;

  const nextState = deepCopy(initialState, { list: { search: "a" } });

  expect(reducer(initialState, listSetSearchText("a"))).toEqual(nextState);

});

test("reducer accepts LIST_SET_SORT actions", () => {

  const { listSetSort } = actions;

  const sort = "popular";

  const nextState = deepCopy(initialState, { list: { sort } });

  expect(reducer(initialState, listSetSort(sort))).toEqual(nextState);

});
