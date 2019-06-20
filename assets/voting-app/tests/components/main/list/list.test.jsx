"use strict";

//local imports

const List = require("../../../../scripts/components/main/list/list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newListParams } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//list

describe("list", () => {

  const { testMount, testShallow } = testWrapper(List);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot", () => testSnapshot());

  it("should call listClearState and metaGetPolls on load and when query string changes", () => {

    const { props, wrapper } = testMount();

    const { actions: { listClearState, metaGetPolls } } = props;

    wrapper.setProps({ location: { search: "?sort=popular" } });

    wrapper.mount();

    testMock(listClearState, [], []);
    testMock(metaGetPolls, [newListParams()], [newListParams({ sort: "popular" })]);

    wrapper.unmount();

  });

});
