"use strict";

//local imports

const PollTitle = require("../../../../scripts/components/main/poll/poll-title");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initSchema, newUser } = require("schemas/master");
const { newPoll, newState } = require("schemas/voting-app");
const { mockResults, testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//poll title

describe("poll title", () => {

  const { testShallow } = testWrapper(PollTitle);

  const testSnapshot = initTestSnapshot(testShallow);

  const testProps = (role, data = {}) => {

    const newForm = initSchema(newState().form);

    const fn = (poll, user = {}) => {
      testSnapshot({ user }, {
        poll,
        role
      });
    };

    switch (role) {
      case "form":
        fn(newForm({ title: data.title }), newUser({ name: data.author }));
        break;
      case "view":
        fn(newPoll(data));
        break;
      default:
        fn(newPoll());
    }

  };

  it("should match snapshot (default)", () => testProps());

  it("should match snapshot (form)", () => testProps("form"));

  it("should match snapshot (form, title)", () => testProps("form", { title: "Title A" }));

  it("should match snapshot (form, author)", () => testProps("form", { author: "Author A" }));

  it("should match snapshot (view)", () => testProps("view"));

  it("should match snapshot (view, title)", () => testProps("view", { title: "Title A" }));

  it("should match snapshot (view, author)", () => testProps("view", { author: "Author A" }));

});

describe("poll title (input)", () => {

  const { testMount } = testWrapper(PollTitle);

  const testInput = (event, fn) => {

    const select = jest.fn(() => ({
      class: jest.fn(),
      text: jest.fn(() => "")
    }));

    PollTitle.injected.select = select;

    const { props, wrapper } = testMount(null, {
      poll: newPoll(),
      role: "form"
    });

    wrapper.find(".js-ref-input").simulate(event);

    fn(props, select);

    wrapper.unmount();

  };

  it("should call formSetTitle on blur", () => testInput("blur", (props, select) => {

    const { actions: { formSetTitle } } = props;

    const [a] = mockResults(select);

    testMock(select, [".js-ref-input"]);

    testMock(a.text, []);

    testMock(formSetTitle, [""]);

  }));

  it("should toggle is-hidden on input", () => testInput("input", (props, select) => {

    const [a, b] = mockResults(select);

    testMock(select, [".js-hide-placeholder"], [".js-ref-input"]);

    testMock(a.class, ["is-hidden", true, ""]);
    testMock(b.text, []);

  }));

});
