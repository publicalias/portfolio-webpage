"use strict";

//local imports

const Sidebar = require("../../scripts/components/sidebar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { testMock } = require("test-helpers/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

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

  const testClick = initTestEvent(testMount, "click");

  const testAuth = (id, dataList = []) => {

    location.assign = jest.fn();

    return testClick(`.qa-auth-${id}`, dataList, ["metaSetLoading", [true]], () => {
      testMock(location.assign, [`/auth/${id}`]);
    });

  };

  it("should call location.assign on click (facebook)", () => testAuth("facebook"));

  it("should call location.assign on click (github)", () => testAuth("github"));

  it("should call location.assign on click (twitter)", () => testAuth("twitter"));

  it("should call location.assign on click (logout)", () => testAuth("logout", [{ user: newUser() }]));

});
