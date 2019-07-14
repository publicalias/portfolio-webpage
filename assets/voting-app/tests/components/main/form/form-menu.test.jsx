"use strict";

//local imports

const FormMenu = require("../../../../scripts/components/main/form/form-menu");

const { testCreateDelete, testWrapper } = require("../../../test-helpers");

//global imports

const { newForm } = require("schemas/voting-app");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(FormMenu);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FormMenu));

//form menu

describe("form menu", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (confirm)", () => testSnapshot({ form: { delete: true } }));

  it("should match snapshot (secret)", () => testSnapshot({ form: { secret: true } }));

});

describe("form menu (create)", () => {

  const testCreate = (res) => testCreateDelete(testMount, [], ".qa-create-poll", res, ["metaCreatePoll", [newForm()]]);

  it("should call metaCreatePoll and history.push on click (success)", () => testCreate({}));

  it("should call metaCreatePoll and history.push on click (errors)", () => testCreate({ errors: [] }));

  it("should call metaCreatePoll and history.push on click (failure)", () => testCreate());

});

describe("form menu (click)", () => {

  const testClick = initTestEvent(testMount, "click");

  const dataList = [{ form: { delete: true } }];

  it("should call formToggleDelete on click (discard)", () => testClick(".qa-confirm-true", [], ["formToggleDelete", []]));

  it("should call formClearState on click (yes)", () => testClick(".qa-discard-poll", dataList, ["formClearState", []]));

  it("should call formToggleDelete on click (no)", () => testClick(".qa-confirm-false", dataList, ["formToggleDelete", []]));

  it("should call formToggleSecret on click (secret)", () => testClick(".qa-toggle-secret", [], ["formToggleSecret", []]));

});
