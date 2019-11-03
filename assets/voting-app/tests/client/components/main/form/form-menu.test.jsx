"use strict";

//local imports

const FormMenu = require("../../../../../scripts/client/components/main/form/form-menu");

const { newForm } = require("../../../../../schemas");
const { testCreateDelete, testWrapper } = require("../../../test-helpers");

//global imports

const { mockResults, testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(FormMenu);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FormMenu, { lib: { select: jest.fn(() => ({})) } }));

//form menu

describe("form menu", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (confirm)", () => testSnapshot({ form: { delete: true } }));

  it("should match snapshot (secret)", () => testSnapshot({ form: { secret: true } }));

});

describe("form menu (create)", () => {

  const testClick = (res) => testCreateDelete(testShallow, [], ".qa-create-poll", res, ["metaCreatePoll", [newForm()]]);

  it("should call metaCreatePoll and history.push on click (success)", () => testClick({}));

  it("should call metaCreatePoll and history.push on click (errors)", () => testClick({ errors: [] }));

  it("should call metaCreatePoll and history.push on click (failure)", () => testClick());

});

describe("form menu (click)", () => {

  const dataList = [{ form: { delete: true } }];

  const testClick = initTestEvent(testShallow, "click");

  it("should call formToggleDelete on click (discard)", () => testClick(".qa-confirm-true", [], ["formToggleDelete", []]));

  it("should call formClearState on click (yes)", () => {

    const fnList = [
      ["formClearState", []],
      () => {

        const { lib: { select } } = FormMenu.injected;

        testMock(select, [".js-edit-title"]);

        expect(mockResults(select)[0].value).toEqual("");

      }
    ];

    return testClick(".qa-discard-poll", dataList, ...fnList);

  });

  it("should call formToggleDelete on click (no)", () => testClick(".qa-confirm-false", dataList, ["formToggleDelete", []]));

  it("should call formToggleSecret on click (secret)", () => testClick(".qa-toggle-secret", [], ["formToggleSecret", []]));

});
