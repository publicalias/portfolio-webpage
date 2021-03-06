"use strict";

//local imports

const VenueItem = require("../../../../../../scripts/client/components/main/venue/list/venue-item");

const { newVenue } = require("../../../../../../schemas");
const { testWrapper } = require("../../../../test-helpers");

//global imports

const { placeholder } = require("all/utilities");
const { initTestEvent, initTestSnapshot, testMockHook, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(VenueItem);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueItem, {
  lib: {
    delimit: jest.fn((x) => x),
    useLazyLoading: jest.fn(() => false),
    useVenueImage: jest.fn((x, y) => y)
  }
}));

//venue item

describe("VenueItem", () => {

  const dataList = [null, {
    venue: newVenue({
      id: "id-a",
      image_url: "https://www.example.com/photo.jpg"
    })
  }];

  const testItem = withDataList(testShallow, dataList);

  const testSnapshot = initTestSnapshot(testItem);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { venue: { name: "Venue A" } }));

  it("should match snapshot (visible)", () => {

    VenueItem.injected.lib.useLazyLoading = jest.fn(() => true);

    testSnapshot();

  });

  it("should call handleError on error", () => {

    const event = { target: { src: "" } };

    const testError = initTestEvent(testItem, "error", event);

    return testError(".qa-error-image", [], () => {
      expect(event.target.src).toEqual(placeholder(800, 450));
    });

  });

  it("should call useVenueImage on update", () => testMockHook(
    VenueItem,
    testMount,
    "useVenueImage",
    dataList
  ));

  it("should call useLazyLoading on update", () => testMockHook(
    VenueItem,
    testMount,
    "useLazyLoading",
    dataList
  ));

});
