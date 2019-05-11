"use strict";

//local imports

const NavBar = require("../../scripts/components/nav-bar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//nav bar

describe("nav bar", () => {

  const { testMount, testShallow } = testWrapper(NavBar);

  const testFilter = (id, data) => () => {

    const { props, wrapper } = testMount(data);

    const { actions: { menuSetFilter }, history } = props;

    wrapper.find(`.qa-nav-${id}`).simulate("click");

    expect(menuSetFilter.mock.calls).toEqual([
      [id, history]
    ]);

  };

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (authenticated)", () => {

    const { wrapper } = testShallow({ user: newUser() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should call menuSetFilter on click (all)", testFilter("all"));

  it("should call menuSetFilter on click (created)", testFilter("created", { user: newUser() }));

  it("should call menuSetFilter on click (voted)", testFilter("voted"));

  it("should call menuSetFilter on click (hidden)", testFilter("hidden"));

  it("should call menuOpenForm on click (form)", () => {

    const { props, wrapper } = testMount({ user: newUser() });

    const { actions: { menuOpenForm }, history } = props;

    wrapper.find(".qa-nav-form").simulate("click");

    expect(menuOpenForm.mock.calls).toEqual([
      [history]
    ]);

  });

});
