"use strict";

//local imports

const Sidebar = require("../../scripts/components/sidebar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//sidebar

describe("sidebar", () => {

  const { testMount, testShallow } = testWrapper(Sidebar);

  const testAuth = (id, data) => {

    const { wrapper } = testMount(data);

    location.assign = jest.fn();

    wrapper.find(`.qa-click-${id}`).simulate("click");

    expect(location.assign.mock.calls).toEqual([
      [`/auth/${id}`]
    ]);

  };

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (authenticated)", () => {

    const { wrapper } = testShallow({ user: newUser({ name: "Ethan Frost" }) });

    expect(wrapper).toMatchSnapshot();

  });

  it("should call location.assign on click (facebook)", () => testAuth("facebook"));

  it("should call location.assign on click (github)", () => testAuth("github"));

  it("should call location.assign on click (twitter)", () => testAuth("twitter"));

  it("should call location.assign on click (logout)", () => testAuth("logout", { user: newUser() }));

});
