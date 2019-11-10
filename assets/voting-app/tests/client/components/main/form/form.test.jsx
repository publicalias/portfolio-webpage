"use strict";

//local imports

const Form = require("../../../../../scripts/client/components/main/form/form");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(Form);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Form));

//form

describe("Form", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot", () => testSnapshot());

  it("should call formClearState on load", () => {

    const { props, wrapper } = testMount();

    const { actions: { formClearState } } = props;

    wrapper.mount();

    testMock(formClearState, []);

    wrapper.unmount();

  });

});
