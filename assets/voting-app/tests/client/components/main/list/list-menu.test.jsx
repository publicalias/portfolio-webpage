"use strict";

//local imports

const ListMenu = require("../../../../../scripts/client/components/main/list/list-menu");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ListMenu);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ListMenu));

//list menu

describe("ListMenu", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  const testClick = initTestEvent(testShallow, "click");

  const testSort = (type) => testClick(`.qa-sort-${type}`, [], (props) => {

    const { history } = props;

    testMock(history.push, [`/list?sort=${type}`]);

  });

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (search)", () => testSnapshot({ list: { menu: { search: "Apple" } } }));

  it("should call handleSearch on click (new)", () => testSort("new"));

  it("should call handleSearch on click (popular)", () => testSort("popular"));

});
