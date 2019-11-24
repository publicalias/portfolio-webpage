"use strict";

//local imports

const MetaPageList = require("../../../../../scripts/client/components/main/meta/meta-page-list");

const { newFavorite } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(MetaPageList);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaPageList));

//meta page list

describe("MetaPageList", () => {

  const testPageList = (type, name) => {

    const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, {
      heading: "Meta",
      list: [],
      type
    }]);

    const testList = (name = "") => testSnapshot(null, {
      list: [newFavorite({
        [type]: {
          name,
          id: "id-a"
        }
      })]
    });

    it(`should match snapshot (${type}, default)`, () => testSnapshot());

    it(`should match snapshot (${type}, list)`, () => testList());

    it(`should match snapshot (${type}, list, name)`, () => testList(name));

  };

  testPageList("user", "User A");

  testPageList("venue", "Venue A");

});
