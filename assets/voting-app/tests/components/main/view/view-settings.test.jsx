"use strict";

/*eslint max-statements: 0*/

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

  const { testMount, testShallow } = testWrapper(ViewSettings);

  const testClick = initTestClick(testMount);
  const testSnapshot = initTestSnapshot(testShallow);

  const testDelete = (res) => {

    const { props, wrapper } = testMount({ view: { confirm: true } }, { poll: newPoll({ id: "id-a" }) });

    const { actions: { metaDeletePoll } } = props;

    metaDeletePoll.mockReturnValueOnce(res);

    return testCreateDelete(props, wrapper, ".qa-delete-poll", metaDeletePoll, ["id-a"], res);

  };

  it("should match snapshot (default)", () => testSnapshot({}, { poll: newPoll() }));

  it("should match snapshot (confirm)", () => testSnapshot({ view: { confirm: true } }, { poll: newPoll() }));

  it("should match snapshot (secret)", () => testSnapshot({}, { poll: newPoll({ secret: true }) }));

  it("should call viewToggleConfirm on click (delete)", () => testClick(".qa-confirm-true", "viewToggleConfirm", [], {}, { poll: newPoll() }));

  it("should call metaDeletePoll on click (yes, success)", () => testDelete({}));

  it("should call metaDeletePoll on click (yes, errors)", () => testDelete({ errors: [] }));

  it("should call metaDeletePoll on click (yes, failure)", () => testDelete());

  it("should call viewToggleConfirm on click (no)", () => testClick(".qa-confirm-false", "viewToggleConfirm", [], { view: { confirm: true } }, { poll: newPoll() }));

  it("should call pollToggleSecret on click (secret)", () => {

    const { props, wrapper } = testMount({}, { poll: newPoll({ id: "id-a" }) });

    return testReload(props, wrapper, ".qa-toggle-secret", "pollToggleSecret", ["id-a"]);

  });

});
