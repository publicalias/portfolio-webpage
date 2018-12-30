"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { filterPolls } = require("../scripts/app-logic");
const { initialState } = require("../scripts/reducer/reducer");
const { mockPoll } = require("./test-helpers");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//filter polls

describe("filter polls", () => {

  const getArgs = (input, output, setup) => ({
    state: deepCopy(initialState, { polls: input.map(mockPoll) }, setup),
    polls: output.map((e) => e.id)
  });

  it("accepts filter all (default)", () => {

    const id = "id-a";

    const pollA = { id: "id-b" };
    const pollB = { private: true };
    const pollC = { users: { hidden: [id] } };

    const { state, polls } = getArgs([pollA, pollB, pollC], [pollA], { user: { id } });

    expect(filterPolls(state)).toEqual(polls);

  });

  it("accepts filter created", () => {

    const id = "id-a";

    const pollA = {
      id: "id-b",
      users: { created: id }
    };
    const pollB = {
      id: "id-c",
      options: [{ created: id }]
    };
    const pollC = {};

    const { state, polls } = getArgs([pollA, pollB, pollC], [pollA, pollB], {
      user: { id },
      list: { filter: "created" }
    });

    expect(filterPolls(state)).toEqual(polls);

  });

  it("accepts filter voted", () => {

    const id = "id-a";

    const pollA = {
      id: "id-b",
      users: { voted: [id] }
    };
    const pollB = {};

    const { state, polls } = getArgs([pollA, pollB], [pollA], {
      user: { id },
      list: { filter: "voted" }
    });

    expect(filterPolls(state)).toEqual(polls);

  });

  it("accepts filter hidden", () => {

    const id = "id-a";

    const pollA = {
      id: "id-b",
      users: { hidden: [id] }
    };
    const pollB = {};

    const { state, polls } = getArgs([pollA, pollB], [pollA], {
      user: { id },
      list: { filter: "hidden" }
    });

    expect(filterPolls(state)).toEqual(polls);

  });

  it("accepts searched", () => {

    const pollA = {
      title: "Title A",
      id: "id-a"
    };
    const pollB = {
      author: "Author A",
      id: "id-b"
    };
    const pollC = {};

    const { state, polls } = getArgs([pollA, pollB, pollC], [pollA, pollB], { list: { searched: "a" } });

    expect(filterPolls(state)).toEqual(polls);

  });

  it("accepts sort new (default)", () => {

    const pollA = {
      id: "id-a",
      date: 0
    };
    const pollB = {
      id: "id-b",
      date: 1
    };

    const { state, polls } = getArgs([pollA, pollB], [pollB, pollA]);

    expect(filterPolls(state)).toEqual(polls);

  });

  it("accepts sort popular", () => {

    const pollA = {
      id: "id-a",
      users: { voted: [""] }
    };
    const pollB = {
      id: "id-b",
      users: { voted: ["", ""] }
    };

    const { state, polls } = getArgs([pollA, pollB], [pollB, pollA], { list: { sort: "popular" } });

    expect(filterPolls(state)).toEqual(polls);

  });

});
