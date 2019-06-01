"use strict";

//local imports

const ListItem = require("../../../../scripts/components/poll/list/list-item");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newListParams, newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { reactTests } = require("test-helpers/react-tests");

//node modules

const { MemoryRouter } = require("react-router-dom");

//setup

beforeAll(reactTests.setup);

//list item

describe("list item", () => {

  const { testMount, testShallow } = testWrapper(ListItem, MemoryRouter);

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (authenticated)", () => {

    const { wrapper } = testShallow({ user: newUser() }, { poll: newPoll() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (hidden)", () => {

    const { wrapper } = testShallow({ user: newUser({ id: "id-a" }) }, { poll: newPoll({ users: { hidden: ["id-a"] } }) });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (flagged)", () => {

    const { wrapper } = testShallow({ user: newUser({ id: "id-a" }) }, { poll: newPoll({ users: { flagged: ["id-a"] } }) });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (10^3 votes)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll({ users: { voted: Math.pow(10, 3) } }) });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (10^6 votes)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll({ users: { voted: Math.pow(10, 6) } }) });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (10^9 votes)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll({ users: { voted: Math.pow(10, 9) } }) });

    expect(wrapper).toMatchSnapshot();

  });

  it("should call handleHide on click", async () => {

    const { props, wrapper } = testMount({}, { poll: newPoll({ id: "id-a" }) });

    const { actions: { metaGetPolls, metaGetUser, pollToggleHide } } = props;

    wrapper.find(".qa-toggle-hide").simulate("click"); //async

    await Promise.resolve();

    testMock(pollToggleHide, ["id-a"]);

    testMock(metaGetUser, []);
    testMock(metaGetPolls, [newListParams(), null, 0]);

    wrapper.unmount();

  });

  it("should call handleFlag on click", async () => {

    const { props, wrapper } = testMount({ user: newUser() }, { poll: newPoll({ id: "id-a" }) });

    const { actions: { metaGetPolls, pollToggleFlag } } = props;

    wrapper.find(".qa-toggle-flag").simulate("click"); //async

    await Promise.resolve();

    testMock(pollToggleFlag, ["id-a"]);

    testMock(metaGetPolls, [newListParams(), null, 0]);

    wrapper.unmount();

  });

});
