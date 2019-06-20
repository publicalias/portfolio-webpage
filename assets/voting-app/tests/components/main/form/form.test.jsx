"use strict";

//local imports

const Form = require("../../../../scripts/components/main/form/form");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//form

describe("form", () => {

  const { testMount, testShallow } = testWrapper(Form);

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
