"use strict";

//local imports

const VenueFavorite = require("../../../../../../../scripts/client/components/main/venue/page/controls/venue-favorite");

const { newUserWithData, newVenue } = require("../../../../../../../schemas");
const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueFavorite);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueFavorite));

//venue favorite

describe("venue favorite", () => {

  const testFavorite = withDataList(testShallow, [null, {
    venue: newVenue({
      id: "id-a",
      name: "Venue A"
    })
  }]);

  const testSnapshot = initTestSnapshot(testFavorite);

  const testClick = initTestEvent(testFavorite, "click");

  it("should match snapshot", () => testSnapshot());

  it("should call handleClick on click", () => testClick(
    ".qa-toggle-favorite",
    [null, { refresh: jest.fn() }],
    (props) => {

      const { actions: { favoriteAdd }, local: { refresh } } = props;

      testMock(favoriteAdd, ["Venue A", "id-a"]);
      testMock(refresh, []);

    }
  ));

});

describe("venue favorite (favorite)", () => {

  const testFavorite = withDataList(testShallow, [{ user: newUserWithData({ id: "id-a" }) }, {
    venue: newVenue({
      favorites: [{
        id: "id-b",
        user: { id: "id-a" }
      }]
    })
  }]);

  const testSnapshot = initTestSnapshot(testFavorite);

  const testClick = initTestEvent(testFavorite, "click");

  it("should match snapshot", () => testSnapshot());

  it("should call handleClick on click", () => testClick(
    ".qa-toggle-favorite",
    [null, { refresh: jest.fn() }],
    (props) => {

      const { actions: { favoriteRemove }, local: { refresh } } = props;

      testMock(favoriteRemove, ["id-b"]);
      testMock(refresh, []);

    }
  ));

});
