"use strict";

//local imports

const Form = require("../../../../scripts/components/poll/form/form");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//form

describe("form", () => {

  const { testMount, testShallow } = testWrapper(Form);

  it("should match snapshot", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should call formClearState on load", () => {

    const { props, wrapper } = testMount();

    const { actions: { formClearState } } = props;

    wrapper.mount();

    testMock(formClearState, []);

    wrapper.unmount();

  });

});
