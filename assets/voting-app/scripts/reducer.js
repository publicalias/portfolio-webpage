"use strict";

//actions

const ADD = (state) => ({ counter: state.counter + 1 });

//reducer

const initialState = { counter: 0 };

const reducer = (state = initialState, action) => {

  const actions = { ADD };

  const valid = action && actions[action.type];

  return valid ? valid(state, action) : state;

};

//exports

module.exports = { reducer };
