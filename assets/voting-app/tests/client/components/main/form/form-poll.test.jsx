"use strict";

//local imports

const FormPoll = require("../../../../../scripts/client/components/main/form/form-poll");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestEvent, initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(FormPoll);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FormPoll, { lib: { hash: jest.fn(() => "0") } }));

//form poll

describe("FormPoll", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  const testBlur = initTestEvent(testShallow, "blur");
  const testChange = initTestEvent(testShallow, "change", { target: { value: "Title A" } });

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot({ user: newUser({ name: "User A" }) }));

  it("should match snapshot (options)", () => testSnapshot({ form: { body: { options: ["Option A"] } } }));

  it("should call handleBlur on blur", () => testBlur(
    ".qa-ref-title",
    [{ form: { body: { title: "Title A" } } }],
    ["formCheckTitle", ["Title A"]]
  ));

  it("should call handleChange on change", () => testChange(
    ".qa-ref-title",
    [],
    ["formSetTitle", ["Title A"]]
  ));

});
