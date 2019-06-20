"use strict";

//local imports

const ListMenu = require("../../../../scripts/components/main/list/list-menu");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//list menu

describe("list menu", () => {

  const { testMount, testShallow } = testWrapper(ListMenu);

  const testSnapshot = initTestSnapshot(testShallow);

  const testSearch = (qa, path, data) => {

    const { props, wrapper } = testMount(data);

    const { history } = props;

    wrapper.find(qa).simulate("click");

    testMock(history.push, [path]);

    wrapper.unmount();

  };

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (search)", () => testSnapshot({ list: { search: "Apple" } }));

  it("should call listSetSearch on change", () => {

    const { props, wrapper } = testMount();

    const { actions: { listSetSearch } } = props;

    wrapper.find(".qa-search-input").simulate("change", { target: { value: "Apple" } });

    testMock(listSetSearch, ["Apple"]);

    wrapper.unmount();

  });

  it("should call history.push on search (submit)", () => testSearch(".qa-search-submit", "/list?search=Apple", { list: { search: "Apple" } }));

  it("should call history.push on search (clear)", () => testSearch(".qa-search-clear", "/list"));

  it("should call history.push on sort (new)", () => testSearch(".qa-sort-new", "/list?sort=new"));

  it("should call history.push on sort (popular)", () => testSearch(".qa-sort-popular", "/list?sort=popular"));

});
