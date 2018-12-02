"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { initialState, reducer } = require("../scripts/reducer");

//global imports

const { deepCopy } = require("utilities");

//tests

describe("reducer", () => {

  it("initializes the state", () => {
    expect(reducer()).toEqual(initialState);
  });

  it("defaults to the previous state", () => {

    const prevState = deepCopy(initialState);

    prevState.page = "view";

    const INVALID = { type: "INVALID" };

    expect(reducer(prevState, INVALID)).toEqual(prevState);

  });

});

describe("reducer:meta", () => {
  it("accepts META_SET_STATE actions", () => {

    const nextState = deepCopy(initialState);

    const poll = {
      title: "",
      author: "",
      id: "",
      date: 0,
      private: false,
      flagged: [""],
      options: [{
        text: "",
        voted: [""]
      }]
    };

    nextState.view.poll = poll;

    const META_SET_STATE = {
      type: "META_SET_STATE",
      data: { view: { poll } }
    };

    expect(reducer(initialState, META_SET_STATE)).toEqual(nextState);

  });
});
