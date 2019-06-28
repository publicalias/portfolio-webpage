"use strict";

//local imports

const Sidebar = require("../../scripts/components/sidebar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//sidebar

describe("sidebar", () => {

  const { testShallow } = testWrapper(Sidebar);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser({ name: "Ethan Frost" }) }));

});

describe("sidebar (auth)", () => {

  const { testMount } = testWrapper(Sidebar);

  const testAuth = (id, data) => {

    const { props, wrapper } = testMount(data);

    const { actions: { metaSetLoading } } = props;

    location.assign = jest.fn();

    wrapper.find(`.qa-auth-${id}`).simulate("click");

    testMock(metaSetLoading, [true]);

    testMock(location.assign, [`/auth/${id}`]);

    wrapper.unmount();

  };

  it("should call location.assign on click (facebook)", () => testAuth("facebook"));

  it("should call location.assign on click (github)", () => testAuth("github"));

  it("should call location.assign on click (twitter)", () => testAuth("twitter"));

  it("should call location.assign on click (logout)", () => testAuth("logout", { user: newUser() }));

});
