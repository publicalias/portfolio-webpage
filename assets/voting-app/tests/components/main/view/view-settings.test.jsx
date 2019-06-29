"use strict";

//local imports

const ViewSettings = require("../../../../scripts/components/main/view/view-settings");

const { testCreateDelete, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { newPoll } = require("schemas/voting-app");
const { initTestClick, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//view settings

describe("view settings", () => {

  const { testShallow } = testWrapper(ViewSettings);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot(null, { poll: newPoll() }));

  it("should match snapshot (confirm)", () => testSnapshot({ view: { confirm: true } }, { poll: newPoll() }));

  it("should match snapshot (secret)", () => testSnapshot(null, { poll: newPoll({ secret: true }) }));

});

describe("view settings (delete)", () => {

  const { testMount } = testWrapper(ViewSettings);

  const testDelete = (res) => {

    const { props, wrapper } = testMount({ view: { confirm: true } }, { poll: newPoll({ id: "id-a" }) });

    const { actions: { metaDeletePoll } } = props;

    metaDeletePoll.mockReturnValueOnce(res);

    return testCreateDelete(props, wrapper, ".qa-delete-poll", metaDeletePoll, ["id-a"], res);

  };

  it("should call metaDeletePoll on click (success)", () => testDelete({}));

  it("should call metaDeletePoll on click (errors)", () => testDelete({ errors: [] }));

  it("should call metaDeletePoll on click (failure)", () => testDelete());

});

describe("view settings (click)", () => {

  const { testMount } = testWrapper(ViewSettings);

  const testClick = initTestClick(testMount);

  it("should call viewToggleConfirm on click (delete)", () => testClick(".qa-confirm-true", "viewToggleConfirm", [], {}, { poll: newPoll() }));

  it("should call viewToggleConfirm on click (no)", () => testClick(".qa-confirm-false", "viewToggleConfirm", [], { view: { confirm: true } }, { poll: newPoll() }));

  it("should call pollToggleSecret on click (secret)", () => {

    const { props, wrapper } = testMount(null, { poll: newPoll({ id: "id-a" }) });

    return testReload(props, wrapper, ".qa-toggle-secret", "pollToggleSecret", ["id-a"]);

  });

});
