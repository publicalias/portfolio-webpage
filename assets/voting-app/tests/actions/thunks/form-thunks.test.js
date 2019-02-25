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

  const getLastState = (add) => deepCopy(initialState, {
    user: { id: "id-a" },
    form: {
      options: [{ text: "Option A" }, { text: "Option B" }],
      add
    }
  });

  it("dispatches META_ADD_ERRORS action if option is empty", () => {

    const lastState = getLastState("");

    const store = mockStore(lastState);
    const actionList = [metaAddErrors(["Option must not be empty"])];

    store.dispatch(action);

    expect(store.getActions()).toEqual(actionList);

  });

  it("dispatches META_ADD_ERRORS action if option is duplicate", () => {

    const lastState = getLastState("Option A");

    const store = mockStore(lastState);
    const actionList = [metaAddErrors(["Option must be unique"])];

    store.dispatch(action);

    expect(store.getActions()).toEqual(actionList);

  });

  it("dispatches META_ADD_ERRORS action if option is obscene", () => {

    const lastState = getLastState("Fuck");

    const store = mockStore(lastState);
    const actionList = [metaAddErrors(["Option must not be obscene"])];

    store.dispatch(action);

    expect(store.getActions()).toEqual(actionList);

  });

  it("dispatches META_SET_STATE action if option is valid", () => {

    const lastState = getLastState("Option C");

    const store = mockStore(lastState);
    const actionList = [metaSetState({
      form: {
        options: lastState.form.options.concat([lastState.form.add]),
        add: ""
      }
    })];

    store.dispatch(action);

    expect(store.getActions()).toEqual(actionList);

  });

});

//form create poll

describe("formCreatePoll", () => {

  const { formCreatePoll, metaAddErrors, metaSetState } = actions;

  const action = formCreatePoll();
  const args = {
    path: "/api/form-create-poll",
    method: "POST",
    data: {
      list: initialState.list,
      form: initialState.form
    }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const res = {
      polls: [{ id: "id-a" }],
      poll: "id-a"
    };

    const actionList = [metaSetState({
      page: "view",
      polls: res.polls,
      list: deepCopy(initialState.list, { filter: "created" }),
      form: deepCopy(initialState.form),
      view: deepCopy(initialState.view, { poll: res.poll })
    })];

    return testAPISuccess(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPISuccess(action, args, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});
