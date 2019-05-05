"use strict";

//local imports

const UI = require("../../scripts/components/ui");

const { mockProps } = require("../test-helpers");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//node modules

const React = require("react");

const { mount, shallow } = require("enzyme");

//setup

beforeAll(reactTests.setup);

//ui

describe("ui", () => {

  it("should match snapshot", () => {

    const props = mockProps();
    const wrapper = shallow(<UI {...props} />);

    expect(wrapper).toMatchSnapshot();

  });

  it("should call metaGetPolls and metaGetUser on mount", () => {

    const props = mockProps();
    const wrapper = mount(<UI {...props} />);

    const { actions: { metaGetPolls, metaGetUser } } = props;

    wrapper.mount();

    expect(metaGetPolls.mock.calls.length).toEqual(1);
    expect(metaGetUser.mock.calls.length).toEqual(1);

    wrapper.unmount();

  });

});
