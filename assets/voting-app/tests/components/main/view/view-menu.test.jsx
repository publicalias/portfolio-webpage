"use strict";

//local imports

const ViewMenu = require("../../../../scripts/components/main/view/view-menu");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { initTestClick, reactTests } = require("test-helpers/react-tests");
const { deepCopy } = require("utilities");

//setup

beforeAll(reactTests.setup);

//view menu

describe("view menu", () => {

  const { testMount, testShallow } = testWrapper(ViewMenu);

  const props = [{ user: newUser({ id: "id-a" }) }, { poll: newPoll({ users: { created: "id-a" } }) }];

  const testClick = initTestClick(testMount);

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (created)", () => {

    const { wrapper } = testShallow(...props);

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (created, settings)", () => {

    const localProps = deepCopy(props, [{ view: { settings: true } }]);

    const { wrapper } = testShallow(...localProps);

    expect(wrapper).toMatchSnapshot();

  });

  it("should call viewToggleSettings on click", () => testClick(".qa-toggle-settings", "viewToggleSettings", [], ...props));

});
