"use strict";

/*eslint max-statements: 0*/

//local imports

const FormMenu = require("../../../../scripts/components/main/form/form-menu");

const { testCreateDelete, testWrapper } = require("../../../test-helpers");

//global imports

const { initTestClick, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//form menu

describe("form menu", () => {

  const { testMount, testShallow } = testWrapper(FormMenu);

  const testClick = initTestClick(testMount);

  const testCreate = (res) => {

    const metaCreatePoll = jest.fn(() => res);

    const { props, wrapper } = testMount({}, {}, { actions: { metaCreatePoll } });

    const { data: { form } } = props;

    return testCreateDelete(props, wrapper, ".qa-create-poll", metaCreatePoll, [form], res);

  };

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (confirm)", () => {

    const { wrapper } = testShallow({ form: { confirm: true } });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (secret)", () => {

    const { wrapper } = testShallow({ form: { secret: true } });

    expect(wrapper).toMatchSnapshot();

  });

  it("should call metaCreatePoll and history.push on click (create, success)", () => testCreate({}));

  it("should call metaCreatePoll and history.push on click (create, errors)", () => testCreate({ errors: [] }));

  it("should call metaCreatePoll and history.push on click (create, failure)", () => testCreate());

  it("should call formToggleConfirm on click (discard)", () => testClick(".qa-confirm-true", "formToggleConfirm"));

  it("should call formClearState on click (yes)", () => testClick(".qa-discard-poll", "formClearState", [], { form: { confirm: true } }));

  it("should call formToggleConfirm on click (no)", () => testClick(".qa-confirm-false", "formToggleConfirm", [], { form: { confirm: true } }));

  it("should call formToggleSecret on click (secret)", () => testClick(".qa-toggle-secret", "formToggleSecret"));

});
