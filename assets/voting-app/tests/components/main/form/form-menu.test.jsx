"use strict";

/*eslint max-statements: 0*/

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

  const testCreate = async (res) => {

    const { props, wrapper } = testMount();

    const { actions: { metaCreatePoll }, data: { form }, history } = props;

    metaCreatePoll.mockReturnValue(res);

    wrapper.find(".qa-create-poll").simulate("click"); //async

    await Promise.resolve();

    testMock(metaCreatePoll, [form]);

    if (res && !res.errors) {
      testMock(history.push, ["/list?filter=created"]);
    }

    wrapper.unmount();

  };

  const testClick = (qa, action, confirm = false) => {

    const { props, wrapper } = testMount({ form: { confirm } });

    wrapper.find(qa).simulate("click");

    testMock(props.actions[action], []);

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

  it("should call metaCreatePoll and history.push on click (create, success)", () => testCreate({}));

  it("should call metaCreatePoll and history.push on click (create, errors)", () => testCreate({ errors: [] }));

  it("should call metaCreatePoll and history.push on click (create, failure)", () => testCreate());

  it("should call formToggleConfirm on click (discard)", () => testClick(".qa-confirm-true", "formToggleConfirm"));

  it("should call formClearState on click (yes)", () => testClick(".qa-discard-poll", "formClearState", true));

  it("should call formToggleConfirm on click (no)", () => testClick(".qa-confirm-false", "formToggleConfirm", true));

  it("should call formToggleSecret on click (secret)", () => testClick(".qa-toggle-secret", "formToggleSecret"));

});
