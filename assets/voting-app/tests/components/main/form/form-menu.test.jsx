"use strict";

//local imports

const FormMenu = require("../../../../scripts/components/main/form/form-menu");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//form menu

describe("form menu", () => {

  const { testMount, testShallow } = testWrapper(FormMenu);

  const testClick = (id, type, confirm = false) => {

    const { props, wrapper } = testMount({ form: { confirm } });

    const { actions } = props;

    wrapper.find(id).simulate("click");

    testMock(actions[type], []);

    wrapper.unmount();

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

  it("should call metaCreatePoll and history.push on click (create)", async () => {

    const { props, wrapper } = testMount();

    const { actions: { metaCreatePoll }, data: { form }, history } = props;

    wrapper.find(".qa-create-poll").simulate("click"); //async

    await Promise.resolve();

    testMock(metaCreatePoll, [form]);

    testMock(history.push, ["/list?filter=created"]);

    wrapper.unmount();

  });

  it("should call formToggleConfirm on click (discard)", () => testClick(".qa-confirm-true", "formToggleConfirm"));

  it("should call formClearState on click (yes)", () => testClick(".qa-discard-poll", "formClearState", true));

  it("should call formToggleConfirm on click (no)", () => testClick(".qa-confirm-false", "formToggleConfirm", true));

  it("should call formToggleSecret on click (secret)", () => testClick(".qa-toggle-secret", "formToggleSecret"));

});
