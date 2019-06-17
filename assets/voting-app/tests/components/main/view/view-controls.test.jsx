"use strict";

//local imports

const ViewControls = require("../../../../scripts/components/main/view/view-controls");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//view controls

describe("view controls", () => {

  const { testMount, testShallow } = testWrapper(ViewControls);

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (authenticated)", () => {

    const { wrapper } = testShallow({ user: newUser() }, { poll: newPoll() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should call writeText on click", () => {

    const { wrapper } = testMount({}, { poll: newPoll() });

    const writeText = jest.fn();

    navigator.clipboard = { writeText };

    wrapper.find(".qa-share-poll").simulate("click");

    testMock(writeText, [location.href]);

    wrapper.unmount();

  });

});
