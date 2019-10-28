"use strict";

//local imports

const ListMenu = require("../../../../../scripts/client/components/main/list/list-menu");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ListMenu);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ListMenu));

//list menu

test("list menu should match snapshot", () => testSnapshot({ list: { search: "Apple" } }));
