"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");
const { mockPoll } = require("../../test-helpers");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//reducer

describe("reducer", () => {

  const { viewChangePoll } = actions;

  const action = viewChangePoll(1);

  const getState = (polls, last, next) => {

    const lastState = deepCopy(initialState, {
      polls: polls.map(mockPoll),
      view: { poll: last }
    });
    const nextState = deepCopy(lastState, { view: deepCopy(initialState.view, { poll: next }) });

    return {
      lastState,
      nextState
    };

  };

  it("accepts VIEW_CHANGE_POLL actions with no polls", () => {

    const { lastState, nextState } = getState([], "id-a", "");

    expect(reducer(lastState, action)).toEqual(nextState);

  });

  it("accepts VIEW_CHANGE_POLL actions with invalid poll", () => {

    const pollA = "id-a";

    const { lastState, nextState } = getState([{ id: pollA }], "id-b", pollA);

    expect(reducer(lastState, action)).toEqual(nextState);

  });

  it("accepts VIEW_CHANGE_POLL actions with valid poll", () => {

    const pollA = "id-a";
    const pollB = "id-b";

    const { lastState, nextState } = getState([{ id: pollA }, { id: pollB }], pollA, pollB);

    expect(reducer(lastState, action)).toEqual(nextState);

  });

});

test("reducer accepts VIEW_SET_ADD_TEXT actions", () => {

  const { viewSetAddText } = actions;

  const add = "Option A";

  const nextState = deepCopy(initialState, { view: { add } });

  expect(reducer(initialState, viewSetAddText(add))).toEqual(nextState);

});

test("reducer accepts VIEW_TOGGLE_CONFIRM actions", () => {

  const { viewToggleConfirm } = actions;

  const nextState = deepCopy(initialState, { view: { confirm: true } });

  expect(reducer(initialState, viewToggleConfirm())).toEqual(nextState);

});

test("reducer accepts VIEW_TOGGLE_SETTINGS actions", () => {

  const { viewToggleSettings } = actions;

  const nextState = deepCopy(initialState, { view: { settings: true } });

  expect(reducer(initialState, viewToggleSettings())).toEqual(nextState);

});
