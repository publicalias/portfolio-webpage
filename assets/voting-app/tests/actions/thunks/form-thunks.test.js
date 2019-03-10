"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

//global imports

const { deepCopy } = require("utilities");

//node modules

const { default: configureStore } = require("redux-mock-store");
const { default: ReduxThunk } = require("redux-thunk");

//setup

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

afterEach(() => {
  global.fetch = undefined;
  global.Headers = undefined;
});

//form add option

describe("formAddOption", () => {

  const { formAddOption, metaAddErrors, metaSetState } = actions;

  const action = formAddOption();

  const testOption = (add, output) => {

    const lastState = deepCopy(initialState, {
      form: {
        options: ["Option A", "Option B"],
        add
      }
    });

    const error = typeof output === "string";

    const store = mockStore(lastState);
    const actionList = [error ? metaAddErrors([output]) : metaSetState(output)];

    store.dispatch(action);

    expect(store.getActions()).toEqual(actionList);

  };

  it("dispatches META_ADD_ERRORS action if option is empty", () => {
    testOption("", "Option must not be empty");
  });

  it("dispatches META_ADD_ERRORS action if option is duplicate", () => {
    testOption("Option A", "Option must be unique");
  });

  it("dispatches META_ADD_ERRORS action if option is obscene", () => {
    testOption("Fuck", "Option must not be obscene");
  });

  it("dispatches META_SET_STATE action if option is valid", () => {
    testOption("Option C", {
      form: {
        options: ["Option A", "Option B", "Option C"],
        add: ""
      }
    });
  });

});

//form create poll

describe("formCreatePoll", () => {

  const { formCreatePoll, metaAddErrors, metaSetState } = actions;

  const action = formCreatePoll();
  const args = {
    path: "/api/form-create-poll",
    method: "POST",
    data: { form: initialState.form }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const res = { id: "id-a" };

    const actionList = [metaSetState({
      page: "view",
      list: deepCopy(initialState.list, { filter: "created" }),
      form: deepCopy(initialState.form),
      view: deepCopy(initialState.view, { poll: "id-a" })
    })];

    return testAPISuccess(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPISuccess(action, args, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});
