"use strict";

//local imports

const List = require("../../../../scripts/components/main/list/list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initSchema } = require("schemas/master");
const { newListParams } = require("schemas/voting-app");
const { mockResults, testMock } = require("test-helpers/meta-tests");
const { initTestRef, initTestSnapshot, reactTests } = require("test-helpers/react-tests");
const { deepCopy } = require("utilities");

//utilities

const { testMount, testShallow } = testWrapper(List);

const newRef = initSchema({
  end: false,
  pending: false
});

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(List, {
  jsx: { ListBody: "ignore" },
  lib: {
    select: jest.fn(() => ({})),
    useRef: jest.fn(() => ({}))
  }
}));

//list

describe("list", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot", () => testSnapshot());

});

describe("list (load and location.search)", () => {

  const testEffect = async (fn) => {

    const { props, wrapper } = testMount(); //async

    wrapper.setProps({ location: { search: "?sort=popular" } });

    wrapper.mount();

    await Promise.resolve();

    fn(props);

    wrapper.unmount();

  };

  it("should reset scrollTop", () => {

    const { lib: { select } } = List.injected;

    return testEffect(() => {

      const [a, b] = mockResults(select);

      testMock(select, [".js-scroll-view"], [".js-scroll-view"]);

      expect(a.scrollTop).toEqual(0);
      expect(b.scrollTop).toEqual(0);

    });

  });

  it("should reset ref", () => {

    const { ref, useRef } = initTestRef(List);

    return testEffect(() => {

      testMock(useRef, [], [], []);

      expect(ref.current).toEqual({
        end: false,
        pending: false
      });

    });

  });

  it("should reset state", () => testEffect((props) => {

    const { actions: { listClearState, metaGetPolls } } = props;

    testMock(metaGetPolls, [newListParams()], [newListParams({ sort: "popular" })]);
    testMock(listClearState, [], []);

  }));

});

describe("list (scroll)", () => {

  const initTestFn = (refOneVal, refTwoVal, call) => (metaGetPolls, refOne, refTwo) => {

    testMock(metaGetPolls, call);

    expect(refOne.current).toEqual(newRef(refOneVal));
    expect(refTwo.current).toEqual(newRef(refTwoVal));

  };

  const setupList = async (scrollVal, refVal, res) => {

    const { ref } = initTestRef(List);

    List.injected.lib.scrollInfo = jest.fn(() => scrollVal || {
      view: 100,
      bottom: 300
    });

    const { props, wrapper } = testMount(); //async

    const { actions: { metaGetPolls } } = props;

    await Promise.resolve();

    metaGetPolls.mockClear().mockReturnValueOnce(res);

    ref.current = newRef(refVal);

    return {
      ref,
      props,
      wrapper
    };

  };

  const testScroll = async (fn, scrollVal, refVal, res) => {

    const { ref, props, wrapper } = await setupList(scrollVal, refVal, res);

    const { actions: { metaGetPolls } } = props;

    wrapper.find(".qa-scroll-view").simulate("scroll"); //async

    const refOne = deepCopy(ref);

    await Promise.resolve();

    const refTwo = deepCopy(ref);

    fn(metaGetPolls, refOne, refTwo);

    wrapper.unmount();

  };

  it("should do nothing if above threshold", () => testScroll(initTestFn(), {
    view: 100,
    bottom: 400
  }));

  it("should do nothing if ref.end", () => {

    const testFn = initTestFn({ end: true }, { end: true });

    return testScroll(testFn, null, { end: true });

  });

  it("should do nothing if ref.pending", () => {

    const testFn = initTestFn({ pending: true }, { pending: true });

    return testScroll(testFn, null, { pending: true });

  });

  it("should call metaGetPolls if allowed (end)", () => {

    const testFn = initTestFn({ pending: true }, { end: true }, [newListParams(), null, 0]);

    return testScroll(testFn, null, null, { polls: Array(0).fill({}) });

  });

  it("should call metaGetPolls if allowed (not end)", () => {

    const testFn = initTestFn({ pending: true }, null, [newListParams(), null, 0]);

    return testScroll(testFn, null, null, { polls: Array(100).fill({}) });

  });

});
