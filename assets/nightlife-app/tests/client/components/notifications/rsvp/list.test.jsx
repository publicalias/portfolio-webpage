"use strict";

//local imports

const List = require("../../../../../scripts/client/components/notifications/rsvp/list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(List);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(List));

//list

describe("list", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  const testClick = initTestEvent(testMount, "click");

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (rsvps)", () => testSnapshot({ notifications: { rsvps: [{}] } }));

  it("should call rsvpGetList on load", () => {

    const { props, wrapper } = testMount();

    const { actions: { rsvpGetList } } = props;

    wrapper.mount();

    testMock(rsvpGetList, []);

    wrapper.unmount();

  });

  it("should call rsvpGetList on click", () => testClick(".qa-sync-rsvp", [], [
    "rsvpGetList",
    [], //on load
    []
  ]));

});
