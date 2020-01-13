"use strict";

//local imports

const FormOptions = require("../../../../../scripts/client/components/main/form/form-options");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(FormOptions);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FormOptions, { lib: { chartColor: jest.fn(() => "black") } }));

//form options

describe("FormOptions", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (options)", () => testSnapshot({ form: { body: { options: ["Option A"] } } }));

  it("should match snapshot (add)", () => testSnapshot({ form: { body: { add: "Option A" } } }));

});
