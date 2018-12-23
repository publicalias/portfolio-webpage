"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../scripts/actions/actions");
const { initialState } = require("../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//node modules

const configureStore = require("redux-mock-store").default;
const ReduxThunk = require("redux-thunk").default;

//setup

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

//form add option

describe("formAddOption", () => {

  const { formAddOption, metaAddErrors, metaSetState } = actions;

  const getLastState = (add) => deepCopy(initialState, {
    user: { id: "id-a" },
    form: {
      options: [{ text: "Option A" }, { text: "Option B" }],
      add
    }
  });

  it("dispatches META_ADD_ERRORS actions with empty input", () => {

    const lastState = getLastState("");

    const store = mockStore(lastState);
    const actionList = [metaAddErrors(["Option must be valid"])];

    store.dispatch(formAddOption());

    expect(store.getActions()).toEqual(actionList);

  });

  it("dispatches META_ADD_ERRORS actions with duplicate input", () => {

    const lastState = getLastState("Option A");

    const store = mockStore(lastState);
    const actionList = [metaAddErrors(["Option must be unique"])];

    store.dispatch(formAddOption());

    expect(store.getActions()).toEqual(actionList);

  });

  it("dispatches META_SET_STATE actions with valid input", () => {

    const lastState = getLastState("Option C");

    const store = mockStore(lastState);
    const actionList = [metaSetState({
      form: {
        options: lastState.form.options.concat([{
          text: lastState.form.add,
          created: "id-a",
          voted: []
        }]),
        add: ""
      }
    })];

    store.dispatch(formAddOption());

    expect(store.getActions()).toEqual(actionList);

  });

});

//form create poll

describe("formCreatePoll", () => {

  const { formCreatePoll, metaAddErrors, metaSetState } = actions;

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const poll = { id: "id-a" };
    const polls = [poll];

    const store = mockStore(initialState);
    const actionList = [metaSetState({
      page: "view",
      polls,
      list: deepCopy(initialState.list, { filter: "created" }),
      form: deepCopy(initialState.form),
      view: { poll }
    })];

    const fetch = () => Promise.resolve({
      ok: true,
      json() {
        return {
          polls,
          poll
        };
      }
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(formCreatePoll()).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

  it("dispatches META_ADD_ERRORS actions on success (not created)", () => {

    const errors = [
      "Poll must have a unique title",
      "Poll must have at least two options",
      "User must have permission"
    ];

    const store = mockStore(initialState);
    const actionList = [metaAddErrors(errors)];

    const fetch = () => Promise.resolve({
      ok: true,
      json() {
        return { errors };
      }
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(formCreatePoll()).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => {

    const status = 500;
    const statusText = "Internal Server Error";

    const store = mockStore(initialState);
    const actionList = [metaAddErrors([`${status} ${statusText}`])];

    const fetch = () => Promise.resolve({
      status,
      statusText,
      ok: false
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(formCreatePoll()).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

});

//form discard poll

test("formDiscardPoll creates FORM_DISCARD_POLL actions", () => {

  const { formDiscardPoll } = actions;

  expect(formDiscardPoll()).toEqual({ type: "FORM_DISCARD_POLL" });

});

//form remove option

test("formRemoveOption creates FORM_REMOVE_OPTION actions", () => {

  const { formRemoveOption } = actions;

  expect(formRemoveOption(0)).toEqual({
    type: "FORM_REMOVE_OPTION",
    index: 0
  });

});

//form set add text

test("formSetAddText creates FORM_SET_ADD_TEXT actions", () => {

  const { formSetAddText } = actions;

  expect(formSetAddText("Option A")).toEqual({
    type: "FORM_SET_ADD_TEXT",
    add: "Option A"
  });

});

//form set title text

test("formSetTitleText creates FORM_SET_TITLE_TEXT actions", () => {

  const { formSetTitleText } = actions;

  expect(formSetTitleText("Title")).toEqual({
    type: "FORM_SET_TITLE_TEXT",
    title: "Title"
  });

});

//form toggle confirm

test("formToggleConfirm creates FORM_TOGGLE_CONFIRM actions", () => {

  const { formToggleConfirm } = actions;

  expect(formToggleConfirm()).toEqual({ type: "FORM_TOGGLE_CONFIRM" });

});

//form toggle private

test("formTogglePrivate creates FORM_TOGGLE_PRIVATE actions", () => {

  const { formTogglePrivate } = actions;

  expect(formTogglePrivate()).toEqual({ type: "FORM_TOGGLE_PRIVATE" });

});
