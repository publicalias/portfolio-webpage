"use strict";

//local imports

const PollTitle = require("../../../../scripts/components/main/poll/poll-title");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newForm, newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//poll title

describe("poll title", () => {

  const { testShallow } = testWrapper(PollTitle);

  const testSnapshot = initTestSnapshot(testShallow);

  const testProps = (role, data = {}) => {

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

  it("should call formSetTitle on change", () => {

    const { props, wrapper } = testMount(null, {
      poll: newForm(),
      role: "form"
    });

    const { actions: { formSetTitle } } = props;

    wrapper.find(".qa-title-input").simulate("change", { target: { value: "Title A" } });

    testMock(formSetTitle, ["Title A"]);

    wrapper.unmount();

  });

});
