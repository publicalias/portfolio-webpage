"use strict";

//local imports

const ListMenu = require("../../../../scripts/components/main/list/list-menu");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//list menu

describe("list menu", () => {

  const { testMount, testShallow } = testWrapper(ListMenu);

  const testSnapshot = initTestSnapshot(testShallow);
  const testChange = initTestEvent(testMount, "change", { target: { value: "Apple" } });

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (search)", () => testSnapshot({ list: { search: "Apple" } }));

  it("should call listSetSearch on change", () => testChange(".qa-search-input", [], ["listSetSearch", ["Apple"]]));

});

describe("list menu (search)", () => {

  const { testMount } = testWrapper(ListMenu);

  const testClick = initTestEvent(testMount, "click");

  const testSearch = (qa, path, dataList = []) => testClick(qa, dataList, (props) => {

    const { history } = props;

    testMock(history.push, [path]);

  });

  it("should call history.push on search (submit)", () => testSearch(".qa-search-submit", "/list?search=Apple", [{ list: { search: "Apple" } }]));

  it("should call history.push on search (clear)", () => testSearch(".qa-search-clear", "/list"));

  it("should call history.push on sort (new)", () => testSearch(".qa-sort-new", "/list?sort=new"));

  it("should call history.push on sort (popular)", () => testSearch(".qa-sort-popular", "/list?sort=popular"));

});
