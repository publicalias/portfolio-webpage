"use strict";

//node modules

const Adapter = require("enzyme-adapter-react-16");
const React = require("react");

const { configure, mount, shallow } = require("enzyme");

//init test wrapper

const mockProps = (newState, actions, data, other) => ({

  ...other,

  actions: Object.keys(actions).reduce((acc, e) => {

    acc[e] = jest.fn();

    return acc;

  }, {}),

  data: newState(data),

  history: { push: jest.fn() },
  location: {},
  match: {},
  staticContext: {}

});

const initTestWrapper = (newState, actions) => (UUT, Context) => {

  const wrapFn = (render) => (data, other) => {

    const props = mockProps(newState, actions, data, other);

    const Component = Context ? (
      <Context>
        <UUT {...props} />
      </Context>
    ) : <UUT {...props} />;

    return {
      props,
      wrapper: render(Component)
    };

  };

  const dive = (Component) => shallow(Component)
    .find(UUT)
    .dive();

  const shallowFn = Context ? dive : shallow;

  return {
    testMount: wrapFn(mount),
    testShallow: wrapFn(shallowFn)
  };

};

//react tests

const reactTests = {
  setup() {
    configure({ adapter: new Adapter() });
  }
};

//exports

module.exports = {
  initTestWrapper,
  reactTests
};
