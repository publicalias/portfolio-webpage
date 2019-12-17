"use strict";

//local imports

const MetaPollDisplay = require("../../../../../scripts/client/components/main/meta/meta-poll-display");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(MetaPollDisplay);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaPollDisplay));

//meta poll display

describe("MetaPollDisplay", () => {

  const dataList = [null, {
    counts: [0],
    labels: ["Option A"]
  }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot", () => testSnapshot());

  it("should call renderChart on update", () => {

    const { props, wrapper } = testMount(...dataList);

    const { local: { counts, labels } } = props;

    const { lib: { renderChart } } = MetaPollDisplay.injected;

    wrapper.mount();

    testMock(renderChart, [counts, labels], [counts, labels]);

    wrapper.unmount();

  });

});
