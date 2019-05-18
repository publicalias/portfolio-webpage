"use strict";

//local imports

const NavBar = require("../../scripts/components/nav-bar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { testMock } = require("test-helpers/meta-tests");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//nav bar

describe("nav bar", () => {

  const { testMount, testShallow } = testWrapper(NavBar);

  const testFilter = (id, data) => () => {

    const { props, wrapper } = testMount(data);

    const { actions: { listSetFilter }, history } = props;

    wrapper.find(`.qa-nav-${id}`).simulate("click");

    testMock(listSetFilter, [id, history]);

  };

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (authenticated)", () => {

    const { wrapper } = testShallow({ user: newUser() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should call listSetFilter on click (all)", testFilter("all"));

  it("should call listSetFilter on click (created)", testFilter("created", { user: newUser() }));

  it("should call listSetFilter on click (voted)", testFilter("voted"));

  it("should call listSetFilter on click (hidden)", testFilter("hidden"));

  it("should call metaOpenForm on click (form)", () => {

    const { props, wrapper } = testMount({ user: newUser() });

    const { actions: { metaOpenForm }, history } = props;

    wrapper.find(".qa-nav-form").simulate("click");

    testMock(metaOpenForm, [history]);

  });

});
