"use strict";

//local imports

const FormMenu = require("../../../../scripts/components/main/form/form-menu");

const { testCreateDelete, testWrapper } = require("../../../test-helpers");

//global imports

const { initTestClick, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//form menu

describe("form menu", () => {

  const { testShallow } = testWrapper(FormMenu);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (confirm)", () => testSnapshot({ form: { confirm: true } }));

  it("should match snapshot (secret)", () => testSnapshot({ form: { secret: true } }));

});

describe("form menu (create)", () => {

  const { testMount } = testWrapper(FormMenu);

  const testCreate = (res) => {

    const { props, wrapper } = testMount();

    const { actions: { metaCreatePoll }, data: { form } } = props;

    metaCreatePoll.mockReturnValueOnce(res);

    return testCreateDelete(props, wrapper, ".qa-create-poll", metaCreatePoll, [form], res);

  };

  it("should call metaCreatePoll and history.push on click (success)", () => testCreate({}));

  it("should call metaCreatePoll and history.push on click (errors)", () => testCreate({ errors: [] }));

  it("should call metaCreatePoll and history.push on click (failure)", () => testCreate());

});

describe("form menu (click)", () => {

  const { testMount } = testWrapper(FormMenu);

  const testClick = initTestClick(testMount);

  it("should call formToggleConfirm on click (discard)", () => testClick(".qa-confirm-true", "formToggleConfirm"));

  it("should call formClearState on click (yes)", () => testClick(".qa-discard-poll", "formClearState", [], { form: { confirm: true } }));

  it("should call formToggleConfirm on click (no)", () => testClick(".qa-confirm-false", "formToggleConfirm", [], { form: { confirm: true } }));

  it("should call formToggleSecret on click (secret)", () => testClick(".qa-toggle-secret", "formToggleSecret"));

});
