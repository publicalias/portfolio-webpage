"use strict";

//local imports

const MetaUserLink = require("../../../../../scripts/client/components/notifications/meta/meta-user-link");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(MetaUserLink);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaUserLink));

//meta user link

describe("MetaUserLink", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { user: { id: "id-a" } }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { user: { name: "User A" } }));

});
