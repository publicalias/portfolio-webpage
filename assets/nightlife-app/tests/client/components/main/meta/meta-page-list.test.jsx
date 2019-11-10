"use strict";

//local imports

const MetaPageList = require("../../../../../scripts/client/components/main/meta/meta-page-list");

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

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, {
    heading: "Meta",
    list: []
  }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (list)", () => testSnapshot(null, {
    list: [
      ["User A", "id-a", "/users/page/id-a"]
    ]
  }));

});
